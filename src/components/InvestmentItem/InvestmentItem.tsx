import {FC, useState} from "react";
import {Input, TableCell, TableRow} from "@mui/material";
import EditIcon from "../UI/Icons/EditIcon.tsx";
import cl from './InvestmentItem.module.scss'
import TrashIcon from "../UI/Icons/TrashIcon.tsx";
import OkIcon from "../UI/Icons/OkIcon.tsx";
import {validatedParse} from "../../utils/validatedParse.ts";

interface InvestmentItemProps {
    symbol: string;
    name: string;
    lastPrice: number;
    stockId: number;
    purchasePrice: number;
    quantity: number;
    onChange: (stockId: number, purchasePrice: number, quantity: number) => void;
    onDelete: (stockId: number) => void;
}

const InvestmentItem: FC<InvestmentItemProps> = (
    {
        symbol,
        name,
        lastPrice,
        stockId,
        purchasePrice,
        quantity,
        onChange,
        onDelete
    }) => {
    const [purchasePriceState, setPurchasePrice] = useState<string>(purchasePrice.toString());
    const [quantityState, setQuantity] = useState<string>(quantity.toString());
    const [changing, setChanging] = useState(false);
    const handleChange = (purchasePriceValue: string, quantityValue: string) => {
        onChange(stockId, validatedParse(purchasePriceValue, parseFloat), validatedParse(quantityValue, parseFloat));
    };

    const handleOnDelete = () => {
        onDelete(stockId);
    }

    return (
        <TableRow>
            <TableCell>{symbol}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{lastPrice}$</TableCell>
            <TableCell>
                <Input
                    type='number'
                    value={purchasePriceState}
                    onChange={(event) => {
                        setPurchasePrice(event.target.value);
                        handleChange(event.target.value, quantityState);
                    }}
                    readOnly={!changing}
                />
            </TableCell>
            <TableCell>
                <Input
                    type='number'
                    value={quantityState}
                    onChange={(event) => {
                        setQuantity(event.target.value);
                        handleChange(purchasePriceState, event.target.value);
                    }}
                    readOnly={!changing}
                />
            </TableCell>
            <TableCell>
                <p style={{color: parseFloat(calc(quantityState, purchasePriceState, lastPrice)) >= 0 ? 'green' : 'red'}}>
                    {calc(quantityState, purchasePriceState, lastPrice)}$
                </p>
            </TableCell>
            <TableCell>
                <div className={cl.buttons}>
                    {
                        changing
                            ? <button onClick={() => setChanging(false)}><OkIcon/></button>
                            : <button onClick={() => setChanging(true)}><EditIcon/></button>
                    }
                    <button onClick={handleOnDelete}><TrashIcon/></button>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default InvestmentItem;


const calc = (quantityState: string, purchasePriceState: string, lastPrice: number) => {
    const quantity = validatedParse(quantityState, parseFloat);
    return (quantity * lastPrice - quantity * validatedParse(purchasePriceState, parseFloat)).toFixed(2);
}