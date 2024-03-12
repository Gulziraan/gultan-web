import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";
import {LoadingButton} from "./UI/loading-button.ts";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks/redux.ts";
import {useEffect} from "react";
import {authApi} from "../store/api/authApi.ts";
import {toast} from "react-toastify";

const Header = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.userState.user);

    const [logoutUser, { isLoading, isSuccess, error, isError }] =
        authApi.useLogoutMutation();

    useEffect(() => {
        if (isSuccess) {
            window.location.href = '/login';
        }

        if (isError) {
            if (Array.isArray((error as any).data.error)) {
                (error as any).data.error.forEach((el: any) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                toast.error((error as any).data.message, {
                    position: 'top-right',
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    const onLogoutHandler = async () => {
        logoutUser();
    };

    return (
        <>
            <AppBar position='static' sx={{ backgroundColor: '#fff' }}>
                <Container maxWidth='lg'>
                    <Toolbar>
                        <Typography
                            variant='h6'
                            onClick={() => navigate('/')}
                            sx={{ cursor: 'pointer', color: '#222', fontWeight: 700 }}
                        >
                            Gultan
                        </Typography>
                        <Box display='flex' sx={{ ml: 'auto' }}>
                            {!user && (
                                <>
                                    <LoadingButton
                                        sx={{ mr: 2 }}
                                        onClick={() => navigate('/register')}
                                    >
                                        SignUp
                                    </LoadingButton>
                                    <LoadingButton onClick={() => navigate('/login')}>
                                        Login
                                    </LoadingButton>
                                </>
                            )}
                            {user && (
                                <>
                                    <LoadingButton onClick={onLogoutHandler} loading={isLoading}>
                                        Logout
                                    </LoadingButton>
                                    <LoadingButton onClick={() => navigate('/profile')}>
                                        Profile
                                    </LoadingButton>
                                </>
                            )}
                            {/*{user && user?.role === 'admin' && (*/}
                            {/*    <LoadingButton*/}
                            {/*        sx={{ ml: 2, border: '2px solid #2363eb' }}*/}
                            {/*        onClick={() => navigate('/admin')}*/}
                            {/*    >*/}
                            {/*        Admin*/}
                            {/*    </LoadingButton>*/}
                            {/*)}*/}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default Header;