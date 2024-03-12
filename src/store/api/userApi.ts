import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import IUser from "../../models/IUser";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        getMe: builder.mutation<IUser, void>({
            query() {
                return {
                    url: 'Users/get-me',
                    method: 'GET',
                };
            },
        }),
    })
})
