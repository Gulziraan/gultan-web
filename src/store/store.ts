import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/userSlice'
import {authApi} from "./api/authApi";
import {userApi} from "./api/userApi";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import {walletApi} from "./api/walletApi.ts";
import {stockApi} from "./api/stockApi.ts";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    userState: userReducer
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        authApi.reducerPath,
        userApi.reducerPath,
        walletApi.reducerPath,
        stockApi.reducerPath
    ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([
            authApi.middleware,
            userApi.middleware,
            walletApi.middleware,
            stockApi.middleware
        ]),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
