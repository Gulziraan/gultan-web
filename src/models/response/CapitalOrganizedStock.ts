import {StockDto} from "./StockDto.ts";

export interface CapitalOrganizedStock {
    maxProfit: number,
    stocks: StockDto[]
}