import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import IUser from "../../models/IUser";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customFetchBase,
    tagTypes: ['me'],
    endpoints: (builder) => ({
        getMe: builder.query<IUser, void>({
            query() {
                return {
                    url: 'Users/get-me',
                    method: 'GET',
                };
            },
            providesTags: ['me']
        }),
        edit: builder.mutation<void, IUser>({
            query(user){
                return {
                    url: 'Users/edit',
                    method: 'PATCH',
                    body: user
                }
            },
            invalidatesTags: ['me']
        })
    })
})

export const {
    useGetMeQuery,
    useEditMutation
} = userApi
