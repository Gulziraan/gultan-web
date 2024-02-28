import {AuthResponse} from "../../models/response/AuthResponse";
import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import {RegisterInput} from "../../pages/Register";
import {LoginInput} from "../../pages/Login";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        registerUser: builder.mutation<AuthResponse, RegisterInput>({
            query(data) {
                return {
                    url: 'Auth/register',
                    method: 'POST',
                    body: data,
                };
            },
        }),
        loginUser: builder.mutation<AuthResponse, LoginInput>({
            query(data) {
                return {
                    url: 'Auth/login',
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                };
            },
        }),
        logout: builder.query({
            query() {
                return {
                    url: 'Auth/logout',
                    method: 'GET',
                };
            },
        }),
    })
})