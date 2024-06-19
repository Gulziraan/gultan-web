import React, { useEffect, useState } from 'react';
import {Box, Input} from "@mui/material";
import cl from './Profile.module.scss';
import Header from "../../components/Header/Header.tsx";
import Button from "../../components/UI/Button/Button.tsx";
import { logout } from "../../store/reducers/userSlice.ts";
import { useAppDispatch } from "../../hooks/redux.ts";
import { useLogoutMutation } from "../../store/api/authApi.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import { useEditMutation, useGetMeQuery } from "../../store/api/userApi.ts";

const Profile = () => {
    const { data, isLoading: meLoading } = useGetMeQuery();
    const [update, { isLoading: updateLoading }] = useEditMutation();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const dispatch = useAppDispatch();
    const [logoutUser, { isLoading: logoutLoading, isSuccess }] = useLogoutMutation();

    useEffect(() => {
        if (data) {
            setName(data.name);
            setSurname(data.surname);
            setPhoneNumber(data.phoneNumber);
        }
    }, [data]);

    useEffect(() => {
        if (isSuccess) {
            window.location.href = '/login';
        }
    }, [isSuccess]);

    const onLogoutHandler = async () => {
        dispatch(logout());
        logoutUser();
    };

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await update({ id: data?.id, name, surname, phoneNumber });
    };

    if (meLoading || logoutLoading || updateLoading) {
        return <Loader />;
    }

    return (
        <div>
            <Header />
            <div className={cl.profile}>
                <h1>Профиль</h1>
                <Box
                    component='form'
                    onSubmit={onSubmitHandler}
                    noValidate
                    autoComplete='off'
                    width='100%'
                    sx={{
                        p: { xs: '1rem', sm: '2rem' },
                        borderRadius: 2,
                    }}
                >
                    <div className={cl.field}>
                        <label htmlFor='name'>Имя </label>
                        <Input
                            id='name'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={cl.field}>
                        <label htmlFor='surname'>Фамилия </label>
                        <Input
                            id='surname'
                            type='text'
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>
                    <div className={cl.field}>
                        <label htmlFor='phoneNumber'>Номер телефона </label>
                        <Input
                            id='phoneNumber'
                            type='text'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <Button type="submit">
                        Сохранить
                    </Button>
                </Box>
                <Button onClick={onLogoutHandler}>
                    Выйти
                </Button>
            </div>
        </div>
    );
};

export default Profile;
