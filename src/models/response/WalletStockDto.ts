import {WalletDto} from "./WalletDto.ts";
import {BaseDto} from "./BaseDto.ts";

export interface WalletStockDto extends BaseDto {
    walletId: number;
    wallet: WalletDto;
    stockId: number;
    stock: StockDto;
    quantity: number;
    purchasePrice: number;
}

interface StockDto extends BaseDto {
    symbol: string;
    name: string;
    exchange: string;
    sector: string;
    industry: string;
    lastPrice: number;
    marketCap: number;
}