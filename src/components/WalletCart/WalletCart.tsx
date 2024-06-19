import cl from './WalletCart.module.scss'
import {FC} from "react";
import walletIcon from '../../assets/walletIcon.svg'
import money from '../../assets/money.svg'
import {useNavigate} from "react-router-dom";
import { format } from 'date-fns';

interface WalletCartProps {
    id: number,
    name: string,
    goal: string
    totalProfit: number,
    createdAt: Date
}

const WalletCart:FC<WalletCartProps> = (
    {
        id,
        totalProfit,
        goal,
        createdAt
    }) => {
    const navigate = useNavigate();
    return (
        <div className={cl.walletCart}>
            <div className={cl.content} onClick={() => navigate('/wallet/' + id)}>
                <div className={cl.title}>
                    <h1>Кошелек - {id}</h1>
                    <hr/>
                </div>
                <div className={cl.info}>
                    <p>Прибыль - {totalProfit}$</p>
                    <p>Дата - {format(new Date(createdAt), 'yyyy-MM-dd')}</p>
                    <p>Цель - {goal}</p>
                </div>
                <img className={cl.moneyIcon} src={money} alt=""/>
            </div>
            <img className={cl.walletIcon} src={walletIcon} alt=""/>
        </div>
    );
};

export default WalletCart;