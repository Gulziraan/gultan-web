import {FC} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import cl from "../InvestmentItem/InvestmentItem.module.scss";
import InvestmentItem from "../InvestmentItem/InvestmentItem.tsx";
import {WalletStockDto} from "../../models/response/WalletStockDto.ts";

interface InvestmentTableProps {
    walletStocks: WalletStockDto[],
    onChange: (stockId: number, purchasePrice: number, quantity: number) => void
    onDelete: (stockId: number) => void;
}

const InvestmentTable: FC<InvestmentTableProps> = ({walletStocks, onChange, onDelete}) => {
    return (
        <TableContainer component={Paper} className={cl.addInvestment}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Тикер</TableCell>
                        <TableCell>Название</TableCell>
                        <TableCell>Последняя цена</TableCell>
                        <TableCell>Цена покупки</TableCell>
                        <TableCell>Количество</TableCell>
                        <TableCell>Прибыль</TableCell>
                        <TableCell>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {walletStocks.map(wallet => (
                        <InvestmentItem
                            key={wallet.stockId}
                            name={wallet.stock.name}
                            symbol={wallet.stock.symbol}
                            lastPrice={wallet.stock.lastPrice}
                            stockId={wallet.stockId}
                            purchasePrice={wallet.purchasePrice}
                            quantity={wallet.quantity}
                            onChange={onChange}
                            onDelete={onDelete}
                        />
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>
                            Общая прибыль {
                            walletStocks.reduce<number>((current, item) => {
                                return current + (item.stock.lastPrice * item.quantity - item.purchasePrice * item.quantity);
                            }, 0)
                        }$
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default InvestmentTable;
