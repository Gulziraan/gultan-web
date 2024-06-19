import {WalletStockDto} from "../response/WalletStockDto.ts";

export interface UpdateWalletStocks {
    walletStocks: WalletStockDto[],
    walletId: number
}