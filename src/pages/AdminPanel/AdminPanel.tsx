import {useState} from "react";
import cl from './AdminPanel.module.scss'
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import Button from "../../components/UI/Button/Button.tsx";
import {useGetTickersQuery, useUpdateForecastMutation} from "../../store/api/stockApi.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ForecastUpdateTable from "../../components/ForecastUpdateTable/ForecastUpdateTable.tsx";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const AdminPanel = () => {
    const theme = useTheme();
    const [date, setDate] = useState<Date>(new Date());
    const {data: tickers, isLoading} = useGetTickersQuery();
    const [selectedTickers, setSelectedTickers] = useState<string[]>([]);
    const [update, {isLoading: updateLoading, reset}] = useUpdateForecastMutation();

    const handleChange = (event: SelectChangeEvent<typeof selectedTickers>) => {
        const {
            target: { value },
        } = event;
        setSelectedTickers(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSubmit = async () => {
        await update({forecastDate: date, tickers: selectedTickers.join(', ')})
        reset()
    }

    if (isLoading || updateLoading) {
        return <Loader/>
    }
    return (
        <div>
            <div className={cl.admin}>
                <h1>Обновление прогноза</h1>
                <div className={cl.inputs}>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Дата прогноза"
                                value={date}
                                onChange={(newValue: Date | null) => {
                                    setDate(newValue!);
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div>
                        <FormControl sx={{width: '200px'}}>
                            <InputLabel id="tickers">Акции</InputLabel>
                            <Select
                                labelId="tickers"
                                id="tickers-select"
                                value={selectedTickers}
                                multiple
                                MenuProps={MenuProps}
                                input={<OutlinedInput label="Name"/>}
                                onChange={handleChange}
                            >
                                {
                                    tickers?.map((item) =>
                                        <MenuItem key={item.id} value={item.symbol}
                                                  style={getStyles(item.symbol, selectedTickers, theme)}>{item.symbol}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <Button onClick={handleSubmit}>Обновить прогноз</Button>
                </div>
                <ForecastUpdateTable/>

            </div>
        </div>
    );
};

export default AdminPanel;

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}