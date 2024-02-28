import React from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {logout, selectCurrentUser} from "../store/reducers/userSlice";
import {Container} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {authApi} from "../store/api/authApi";
import {useNavigate} from "react-router-dom";

const Users = () => {
    const user = useAppSelector(selectCurrentUser)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutUser = () => {
        dispatch(authApi.endpoints?.logout.initiate(''));
        dispatch(logout())
        navigate('/login')
    }
    return (
        <Container>
            <h1>Hello {user.user?.userName}</h1>
            <LoadingButton onClick={logoutUser}>Выйти</LoadingButton>
        </Container>
    );
};

export default Users;