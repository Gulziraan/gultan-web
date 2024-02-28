import React, {useEffect} from 'react';
import {object, string, TypeOf} from "zod";
import {authApi} from "../store/api/authApi";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Container, Link, styled, Typography} from "@mui/material";
import {LoadingButton as _LoadingButton} from '@mui/lab';
import FormInput from "../components/UI/FormInput";
import Register from "./Register";
import {setAccessToken, setUser} from "../store/reducers/userSlice";
import {useAppDispatch} from "../hooks/redux";

const LoadingButton = styled(_LoadingButton)`
    padding: 0.6rem 0;
    background-color: #f9d13e;
    color: #2363eb;
    font-weight: 500;

    &:hover {
        background-color: #ebc22c;
        transform: translateY(-2px);
    }
`;

const LinkItem = styled(Link)`
    text-decoration: none;
    color: #2363eb;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const loginSchema = object({
    userName: string().min(1, 'Full name is required').max(100),
    password: string()
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const Login = () => {
    const methods = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });
    const dispatch = useAppDispatch()

    const [loginUser, {isLoading, isError, error, isSuccess, data}] =
        authApi.useLoginUserMutation();

    const navigate = useNavigate();
    const location = useLocation();

    const from = ((location.state as any)?.from.pathname as string) || '/';

    useEffect(() => {
        if (isSuccess) {
            console.log('It was successful');
            if(data){
                dispatch(setUser(data.user));
                dispatch(setAccessToken(data.accessToken));
            }
            navigate(from);
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

    const {
        reset,
        handleSubmit,
        formState: {isSubmitSuccessful},
    } = methods;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
        // 👇 Executing the loginUser Mutation
        loginUser(values);
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#2363eb',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    variant='body1'
                    component='h2'
                    sx={{color: '#e5e7eb', mb: 2}}
                >
                    Login to have access!
                </Typography>

                <FormProvider {...methods}>
                    <Box
                        component='form'
                        onSubmit={handleSubmit(onSubmitHandler)}
                        noValidate
                        autoComplete='off'
                        maxWidth='27rem'
                        width='100%'
                        sx={{
                            backgroundColor: '#e5e7eb',
                            p: {xs: '1rem', sm: '2rem'},
                            borderRadius: 2,
                        }}
                    >
                        <FormInput name='userName' label='User name' type='text'/>
                        <FormInput name='password' label='Password' type='password'/>

                        <Typography
                            sx={{fontSize: '0.9rem', mb: '1rem', textAlign: 'right'}}
                        >
                        </Typography>

                        <LoadingButton
                            variant='contained'
                            sx={{mt: 1}}
                            fullWidth
                            disableElevation
                            type='submit'
                            loading={isLoading}
                        >
                            Login
                        </LoadingButton>

                        <Typography sx={{fontSize: '0.9rem', mt: '1rem'}}>
                            Need an account? <LinkItem onClick={() => navigate('/register')}>Sign Up Here</LinkItem>
                        </Typography>
                    </Box>
                </FormProvider>
            </Box>
        </Container>
    );
};

export default Login;