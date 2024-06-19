import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase.ts";
import {StockDto} from "../../models/response/StockDto.ts";
import {CapitalOrganizedStock} from "../../models/response/CapitalOrganizedStock.ts";
import {ForecastUpdate} from "../../models/response/ForecastUpdate.ts";


export const stockApi = createApi({
    reducerPath: 'stock',
    baseQuery: customFetchBase,
    tagTypes: ['forecastUpdate'],
    endpoints: builder => ({
        getTickers: builder.query<StockDto[], void>({
            query() {
                return {
                    method: 'GET',
                    url: `StockData/tickers`
                }
            }
        }),
        getWalletTickers: builder.query<CapitalOrganizedStock, {existIds: number[], walletId: number}>({
            query({existIds, walletId}) {
                const params = new URLSearchParams();
                existIds.forEach(id => params.append('existIds', id.toString()));
                return {
                    method: 'GET',
                    url: `StockData/tickers-filtered?${params.toString()}&walletId=${walletId}`
                }
            }
        }),
        getForecastUpdates: builder.query<ForecastUpdate[], void>({
            query() {
                return {
                    method: 'GET',
                    url: 'StockData/forecast-update'
                }
            },
            providesTags: ['forecastUpdate']
        }),
        updateForecast: builder.mutation<void, ForecastUpdate>({
            query(forecast) {
                return {
                    method: 'POST',
                    url: 'StockData/forecast-update',
                    body: forecast
                }
            },
            invalidatesTags: ['forecastUpdate']
        })
    })
})

export const {
    useGetTickersQuery,
    useGetWalletTickersQuery,
    useGetForecastUpdatesQuery,
    useUpdateForecastMutation
} = stockApi