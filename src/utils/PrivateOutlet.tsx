import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {FC} from "react";
import footerImg from "../assets/footer.png";

const PrivateOutlet:FC = () => {
    const auth = useAuth()
    const location = useLocation()

    if(auth.user.accessToken === null || auth.user.accessToken === undefined){
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return (
        <>
            <Outlet/>
            <img style={{width: '100%', padding: '0', marginTop: '50px'}} src={footerImg} alt=""/>
        </>
    );
};

export default PrivateOutlet;