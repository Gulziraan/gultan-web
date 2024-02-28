import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError,} from '@reduxjs/toolkit/query';
import {Mutex} from 'async-mutex';
import {logout, setAccessToken, setUser} from "../reducers/userSlice";
import {HttpStatusCode} from "axios";
import {AuthResponse} from "../../models/response/AuthResponse";
import {RootState} from "../store";

const baseUrl = `https://gultan.somee.com/`;

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = (getState() as RootState).userState.accessToken
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        headers.set('Access-Control-Allow-Origin', '*')
        return headers
    },
})

const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
    = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if ((result.error?.data as any)?.status === HttpStatusCode.Unauthorized) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult = await baseQuery(
                    {credentials: 'include', url: 'Auth/refresh', method: "POST"},
                    api,
                    extraOptions
                );

                if (refreshResult.data) {
                    const data = refreshResult.data as AuthResponse
                    api.dispatch(setUser(data.user));
                    api.dispatch(setAccessToken(data.accessToken));
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout());
                    window.location.href = '/login';
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export default customFetchBase;
