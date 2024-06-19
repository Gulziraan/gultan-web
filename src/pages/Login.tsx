import {useEffect} from 'react';
import {object, string, TypeOf} from "zod";
import {useLoginUserMutation} from "../store/api/authApi";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Container, Typography} from "@mui/material";
import {LoadingButton} from '../components/UI/loading-button.ts';
import {LinkItem} from '../components/UI/link-item.ts'
import FormInput from "../components/UI/FormInput/FormInput.tsx";
import {setAccessToken, setUser} from "../store/reducers/userSlice";
import {useAppDispatch} from "../hooks/redux";


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
        useLoginUserMutation();

    const navigate = useNavigate();
    const location = useLocation();

    const from = ((location.state as any)?.from.pathname as string) || '/';

    useEffect(() => {
        if (isSuccess) {
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
                    Войдите, чтобы получить доступ!
                </Typography>

                <FormProvider {...methods}>
                    <Box
                        component='form'
                        onSubmit={handleSubmit(onSubmitHandler)}
                        maxWidth='27rem'
                        width='100%'
                        sx={{
                            backgroundColor: '#e5e7eb',
                            p: {xs: '1rem', sm: '2rem'},
                            borderRadius: 2,
                        }}
                    >
                        <FormInput name='userName' label='Имя пользователя' type='text'/>
                        <FormInput name='password' label='Пароль' type='password'/>

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
                            Войти
                        </LoadingButton>

                        <Typography sx={{fontSize: '0.9rem', mt: '1rem'}}>
                            Нужен аккаунт? <LinkItem onClick={() => navigate('/register')}>Регистрация здесь</LinkItem>
                        </Typography>
                    </Box>
                </FormProvider>
            </Box>
        </Container>
    );
};

export default Login;