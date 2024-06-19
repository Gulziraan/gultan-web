import cl from './Stocks.module.scss'
import StockTable from "../../components/StockTable/StockTable.tsx";
import Banner from "../../components/Banner/Banner.tsx";
import {useAppSelector} from "../../hooks/redux.ts";
import AdminPanel from "../AdminPanel/AdminPanel.tsx";
import graphic from '../../assets/priceGraphic.png'


const Stocks = () => {
    const user = useAppSelector(state => state.userState.user);

    return (
        <div>
            <Banner/>
            <div className={cl.stocks}>
                <h1>Акции - цена</h1>
                <StockTable checkboxSelection={false}/>
                {
                    user.isAdmin
                        ? <AdminPanel/>
                        : <img style={{width: '100%', marginTop: '20px'}} src={graphic} alt=""/>
                }
            </div>
        </div>
    );
};

export default Stocks;