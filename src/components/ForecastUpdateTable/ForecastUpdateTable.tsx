import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import cl from "../InvestmentItem/InvestmentItem.module.scss";
import Loader from "../UI/Loader/Loader.tsx";
import {useGetForecastUpdatesQuery} from "../../store/api/stockApi.ts";
import {format } from "date-fns";

const ForecastUpdateTable = () => {
    const {data: forecastUpdates, isLoading: forecastUpdatesLoading} = useGetForecastUpdatesQuery();

    if (forecastUpdatesLoading){
        return <Loader/>
    }
    return (
        <TableContainer component={Paper} className={cl.addInvestment}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Дата</TableCell>
                        <TableCell>Тикеры</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        forecastUpdates?.map((forecast) =>
                            <TableRow>
                                <TableCell>{format(new Date(forecast.forecastDate), 'yyyy-MM-dd hh:mm')}</TableCell>
                                <TableCell>{forecast.tickers}</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ForecastUpdateTable;