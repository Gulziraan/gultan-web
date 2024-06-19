import cl from './Home.module.scss'
import vopros from '../../assets/vopros.png'
import graphic from '../../assets/graphic.png'
import wallet from '../../assets/wallet.png'
import editData from '../../assets/editData.png'
import consult from '../../assets/consult.png'
import diff1 from '../../assets/diffStock.png'
import diff2 from '../../assets/diffStock2.png'
import diff3 from '../../assets/diffStock3.png'
import stockTable from '../../assets/stockTable.png'
import footerImg from '../../assets/footer.png'
import Banner from "../../components/Banner/Banner.tsx";

const Home = () => {
    return (
        <div>
            <Banner/>
            <div className={cl.otherInfo}>
                <div className={cl.stickySidebar}>
                    <div className={cl.textWithVopros}>
                        <div className={cl.forWhat}>
                            <p>Для чего</p>
                            <img height={300} src={vopros} alt=""/>
                        </div>
                        <p className={cl.useAll}>используй все функциональные возможности </p>
                    </div>
                </div>
                <div className={cl.scrollableContent}>
                    <section>
                        <p className={cl.zagolovok}>Смотри прогноз</p>
                        <img src={graphic} alt=""/>
                    </section>
                    <section>
                        <p className={cl.zagolovok}>Создай кошелек</p>
                        <img src={wallet} alt=""/>
                    </section>
                    <section>
                        <p className={cl.zagolovok}>Введи предпочтения</p>
                        <img src={editData} alt=""/>
                    </section>
                    <section>
                        <p className={cl.zagolovok}>Получи консультацию</p>
                        <img src={consult} alt=""/>
                    </section>
                    <section>
                        <p className={cl.zagolovok}>Добавь акции</p>
                        <img src={stockTable} alt=""/>
                    </section>
                </div>
            </div>
            <div className={cl.footer}>
                <div className={cl.images}>
                    <img src={diff1} alt=""/>
                    <img src={diff2} alt=""/>
                    <img src={diff3} alt=""/>
                </div>
                <div className={cl.textWithVopros} style={{margin: '140px 0 0 120px'}}>
                    <div className={cl.forWhat} style={{alignItems: 'center'}}>
                        <p>Доверие</p>
                        <img height={300} src={vopros} alt=""/>
                    </div>
                    <p className={cl.useAll} style={{width: '400px', textAlign: 'center'}}>сравнение прогноза с реальным
                        значением</p>
                </div>
            </div>
        </div>
    );
};

export default Home;