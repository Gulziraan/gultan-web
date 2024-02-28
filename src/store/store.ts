import {configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/userSlice'
import {authApi} from "./api/authApi";
import {userApi} from "./api/userApi";


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        userState: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([
            authApi.middleware,
            userApi.middleware
        ]),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
