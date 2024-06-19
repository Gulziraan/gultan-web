import {BaseDto} from "./BaseDto.ts";

export interface StockDto extends BaseDto{
    symbol: string;
    name: string;
    exchange: string;
    sector: string;
    industry: string;
    lastPrice: number;
    forecastPrice: number;
    marketCap: number;
    recommendCount: number
}