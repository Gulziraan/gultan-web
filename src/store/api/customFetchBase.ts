import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError,} from '@reduxjs/toolkit/query';
import {Mutex} from 'async-mutex';
import {logout, setAccessToken} from "../reducers/userSlice";
import {AuthResponse} from "../../models/response/AuthResponse";
import {RootState} from "../store";
import {HttpStatusCode} from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).userState.accessToken
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
            headers.set("Content-Type", "application/json");
        }

        return headers
    },
})
const customFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === HttpStatusCode.Unauthorized) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshResult = await baseQuery(
                    'Auth/refresh',
                    api,
                    extraOptions
                )
                if (refreshResult.data) {
                    const data = refreshResult.data as AuthResponse
                    api.dispatch(setAccessToken(data.accessToken))
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    api.dispatch(logout)
                    window.location.href = "/login"
                }
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

export default customFetchBase;
