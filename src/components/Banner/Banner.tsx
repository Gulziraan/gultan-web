import Header from "../Header/Header.tsx";
import cl from './Banner.module.scss'

const Banner = () => {
    return (
        <div className={cl.homePage}>
            <Header/>
            <h2>
                Инвестируй с нами <span>оптимизируй свои инвестиции</span>
            </h2>
        </div>
    );
};

export default Banner;