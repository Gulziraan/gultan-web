import {useGetTickersQuery, useGetWalletTickersQuery} from "../../store/api/stockApi.ts";
import Loader from "../UI/Loader/Loader.tsx";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {FC, useEffect, useState} from "react";
import {StockDto} from "../../models/response/StockDto.ts";

const columns: GridColDef[] = [
    {field: 'name', headerName: 'Название', width: 150},
    {field: 'symbol', headerName: 'Тикер', width: 90},
    {field: 'exchange', headerName: 'Биржа', width: 90},
    {
        field: 'lastPrice',
        headerName: 'Последняя цена',
        type: 'number',
        width: 120,
        valueGetter: (value) => `${value}$`
    },
    {
        field: 'forecastPrice',
        headerName: 'Прогнозируемая цена',
        type: 'number',
        width: 120,
        valueGetter: (value: number) => value > 0 ? `${value.toFixed(2)}$` : '',
    },
    {
        field: 'marketCap',
        headerName: 'Рыночная капитализация',
        width: 240,
        valueGetter: (value) => `${formatCurrency(value)}$`,
    },
    {
        field: 'recommendCount',
        headerName: 'Рекомендуем к покупке',
        width: 100,
        valueGetter: (value) => value > 0 ? `${value} шт` : '',
    },
];

interface StockTableProps {
    checkboxSelection: boolean,
    setSelectionItems?: (items: number[]) => void,
    filterForTickers?: number[],
    walletId?: number
}

const StockTable: FC<StockTableProps> = (
        {
            checkboxSelection,
            setSelectionItems,
            filterForTickers,
            walletId
        }) => {
        const [tickersState, setTickersState] = useState<StockDto[]>([]);

        const {
            data: tickers,
            isLoading,
            isSuccess: tickersSuccess,
        } = useGetTickersQuery();
        const {
            data: tickersWithRecommend,
            isLoading: tickersWithRecommendLoading,
            isSuccess: tickersWithRecommendSuccess
        } = useGetWalletTickersQuery({existIds: filterForTickers!, walletId: walletId!});

        useEffect(() => {
                if (tickersWithRecommendSuccess && tickersWithRecommend) {
                    setTickersState(tickersWithRecommend.stocks);
                } else if (tickersSuccess) {
                    setTickersState(tickers);
                }
            }, [
                tickersSuccess,
                tickersWithRecommendSuccess
            ]
        )
        ;

        if (isLoading || tickersWithRecommendLoading) {
            return <Loader/>
        }
        return (
            <div style={{marginTop: 10}}>
                <DataGrid
                    rows={tickersState}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 5},
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection={checkboxSelection}
                    onStateChange={(state) => {
                        if (setSelectionItems) {
                            setSelectionItems(state.rowSelection)
                        }
                    }}
                />
            </div>
        );
    }
;

export default StockTable;

function formatCurrency(amount: number): string {
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}