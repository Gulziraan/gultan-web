import {FC, useEffect} from 'react';
import {useGetWalletTickersQuery} from "../../store/api/stockApi.ts";
import Loader from "../UI/Loader/Loader.tsx";
import {Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import Modal from "../UI/Modal/Modal.tsx";

interface Recommendation {
    walletId?: number,
    isOpen: boolean,
    onClose: () => void
}

const Recommendation: FC<Recommendation> = (
    {
        walletId,
        isOpen,
        onClose
    }) => {
    const {
        data: tickersWithRecommend,
        isLoading: tickersWithRecommendLoading,
        isFetching,
        refetch
    } = useGetWalletTickersQuery({existIds: [], walletId: walletId!});

    useEffect(() => {
        if(isOpen){
            refetch()
        }
    }, [isOpen]);

    if(tickersWithRecommendLoading || isFetching){
        return <Loader/>
    }
    return (
        <Modal open={isOpen} onClose={onClose}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Тикер</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell>Последняя цена</TableCell>
                            <TableCell>Прогнозируемая цена</TableCell>
                            <TableCell>Рекомендуем к покупке</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tickersWithRecommend?.stocks.filter(x => x.recommendCount > 0).map((ticker) =>
                                <TableRow>
                                    <TableCell>{ticker.symbol}</TableCell>
                                    <TableCell>{ticker.name}</TableCell>
                                    <TableCell>{ticker.lastPrice}$</TableCell>
                                    <TableCell>{ticker.forecastPrice.toFixed(2)}$</TableCell>
                                    <TableCell>{ticker.recommendCount} шт</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell>
                                Общая прибыль составит {tickersWithRecommend?.maxProfit.toFixed(2)}$
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Modal>
    );
};

export default Recommendation;