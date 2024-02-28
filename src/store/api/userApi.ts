import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import IUser from "../../models/IUser";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], undefined>({
            query: () => {
                return {
                    url: 'Auth/users',
                    method: 'GET',
                };
            },
        }),
        getUser: builder.query({
            query: () => {
                return {
                    url: 'Auth/user',
                    method: 'GET',
                };
            },
        }),
    })
})