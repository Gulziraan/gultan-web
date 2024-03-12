import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {FC} from "react";
import Header from "../components/Header.tsx";

const PrivateOutlet:FC = () => {
    const auth = useAuth()
    const location = useLocation()

    if(auth.user.accessToken === null || auth.user.accessToken === undefined){
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
};

export default PrivateOutlet;