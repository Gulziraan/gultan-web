import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux.ts";
import Button from "../UI/Button/Button.tsx";
import cl from './Header.module.scss';

const Header = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.userState);

    return (
        <header className={cl.header}>
            <div className={cl.container}>
                <div className={cl.toolbar}>
                    <h1 className={cl.title} onClick={() => navigate('/')}>
                        InvestProfi
                    </h1>
                    <div className={cl.actions}>
                        <div className={cl.buttons}>

                            {!user.accessToken ? (
                                <div className={cl.actionButtons}>
                                    <Button onClick={() => navigate('/register')}>
                                        Регистрация
                                    </Button>
                                    <Button onClick={() => navigate('/login')}>
                                        Войти
                                    </Button>
                                </div>
                            ) : (
                                <div className={cl.actionButtons}>
                                    <Button onClick={() => navigate('/stocks')}>
                                        Акции
                                    </Button>
                                    <Button onClick={() => navigate('/wallets')}>
                                        Портфель
                                    </Button>
                                    <Button onClick={() => navigate('/profile')}>
                                        Профиль
                                    </Button>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
