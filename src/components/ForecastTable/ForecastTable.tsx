import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const ForecastTable = () => {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell align="right">Дата прогноза</TableCell>
                            <TableCell align="right">Предпологаемая цена</TableCell>
                            <TableCell align="right">Действительная цена</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*{rows.map((row) => (*/}
                        {/*    <TableRow*/}
                        {/*        key={row.name}*/}
                        {/*        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/}
                        {/*    >*/}
                        {/*        <TableCell component="th" scope="row">*/}
                        {/*            {row.name}*/}
                        {/*        </TableCell>*/}
                        {/*        <TableCell align="right">{row.calories}</TableCell>*/}
                        {/*        <TableCell align="right">{row.fat}</TableCell>*/}
                        {/*        <TableCell align="right">{row.carbs}</TableCell>*/}
                        {/*        <TableCell align="right">{row.protein}</TableCell>*/}
                        {/*    </TableRow>*/}
                        {/*))}*/}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ForecastTable;