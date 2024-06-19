import {ToastContainer} from 'react-toastify';
import './App.css';
import {Route, Routes} from "react-router-dom";
import PrivateOutlet from "./utils/PrivateOutlet";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {CssBaseline} from "@mui/material";
import Home from "./pages/Home/Home.tsx";
import Wallets from "./pages/Wallets/Wallets.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import Stocks from "./pages/Stocks/Stocks.tsx";
import Wallet from "./pages/Wallet/Wallet.tsx";
import AdminPanel from "./pages/AdminPanel/AdminPanel.tsx";

function App() {
    return (
        <>
            <CssBaseline/>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<PrivateOutlet/>}>
                    <Route index element={<Home/>} />
                    <Route path='/wallets' element={<Wallets/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/stocks' element={<Stocks/>}/>
                    <Route path='/wallet/:id' element={<Wallet/>}/>
                    <Route path='/admin' element={<AdminPanel/>}/>
                </Route>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </>
    );
}

export default App
