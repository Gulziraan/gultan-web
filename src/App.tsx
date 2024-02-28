import React, {FC} from 'react';
import {ToastContainer} from 'react-toastify';
import './App.css';
import {Route, Routes} from "react-router-dom";
import PrivateOutlet from "./utils/PrivateOutlet";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {CssBaseline} from "@mui/material";

const App: FC = () => {

    return (
        <>
            <CssBaseline/>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<PrivateOutlet />}>
                    <Route index element={<Users />} />
                </Route>
                <Route path='login' element={<Login/>}/>
                <Route path='register' element={<Register/>}/>
            </Routes>
        </>
    );
}

export default App;
