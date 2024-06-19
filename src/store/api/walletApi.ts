import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase.ts";
import {WalletDto} from "../../models/response/WalletDto.ts";
import {WalletStockDto} from "../../models/response/WalletStockDto.ts";
import {AddWalletStock} from "../../models/requests/AddWalletStock.ts";
import {UpdateWalletStocks} from "../../models/requests/UpdateWalletStocks.ts";
import {GoalDto} from "../../models/response/GoalDto.ts";
import {UpdateWalletSettings} from "../../models/requests/UpdateWalletSettings.ts";


export const walletApi = createApi({
    reducerPath: 'wallet',
    baseQuery: customFetchBase,
    tagTypes: ['Wallets', 'WalletStocks', 'WalletSettings'],
    endpoints: (builder) => ({
        getWallets: builder.query<WalletDto[], void>({
            query() {
                return {
                    url: 'Wallet/wallets',
                    method: "GET"
                }
            },
            providesTags: ['Wallets', 'WalletStocks', 'WalletSettings']
        }),
        addWallet: builder.mutation<void, string>({
            query(name) {
                return {
                    url: `Wallet/wallets/${name}`,
                    method: 'POST'
                }
            },
            invalidatesTags: ['Wallets']
        }),
        updateWalletStocks: builder.mutation<void, UpdateWalletStocks>({
            query(request) {
                return {
                    url: 'Wallet/wallet-stocks',
                    method: 'PUT',
                    body: request
                }
            },
            invalidatesTags: ['WalletStocks']
        }),
        getWalletStocks: builder.query<WalletStockDto[], number>({
            query(walletId) {
                return {
                    url: `Wallet/wallet-stocks`,
                    method: 'GET',
                    params: {walletId}
                }
            },
            providesTags: ['WalletStocks']
        }),
        addWalletStocks: builder.mutation<void, AddWalletStock>({
            query(request) {
                return {
                    url: 'Wallet/wallet-stocks',
                    method: 'POST',
                    body: request
                }
            },
            invalidatesTags: ['WalletStocks']
        }),
        getWalletById: builder.query<WalletDto, number>({
            query(walletId) {
                return {
                    url: 'Wallet/wallet-by-id',
                    method: 'GET',
                    params: {walletId}
                }
            },
            providesTags: ['WalletSettings']
        }),
        getWalletGoals: builder.query<GoalDto[], void>({
            query() {
                return {
                    url: 'Wallet/wallet-goals',
                    method: 'GET'
                }
            }
        }),
        updateWalletSettings: builder.mutation<void, UpdateWalletSettings>({
            query(data) {
                return {
                    url: 'Wallet/wallet-settings',
                    method: 'PUT',
                    body: data
                }
            },
            invalidatesTags: ['WalletSettings']
        })
    })
})

export const {
    useAddWalletMutation,
    useGetWalletsQuery,
    useGetWalletStocksQuery,
    useAddWalletStocksMutation,
    useUpdateWalletStocksMutation,
    useGetWalletByIdQuery,
    useGetWalletGoalsQuery,
    useUpdateWalletSettingsMutation
} = walletApi