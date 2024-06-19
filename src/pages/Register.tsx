import {Box, Container, Typography} from '@mui/material';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {object, string, TypeOf} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {LoadingButton} from '../components/UI/loading-button.ts';
import {LinkItem} from '../components/UI/link-item.ts';
import {toast} from 'react-toastify';
import {useRegisterUserMutation} from "../store/api/authApi";
import FormInput from "../components/UI/FormInput/FormInput.tsx";

const registerSchema = object({
    userName: string().min(1, 'Full name is required').max(100),
    email: string()
        .min(1, 'Email address is required')
        .email('Email Address is invalid'),
    password: string()
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const Register = () => {
    const methods = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    // 👇 Calling the Register Mutation
    const [registerUser, {isLoading, isSuccess, error, isError}] =
        useRegisterUserMutation();

    const navigate = useNavigate();

    const {
        reset,
        handleSubmit,
        formState: {isSubmitSuccessful},
    } = methods;

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
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

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
        registerUser(values);
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
                <Typography component='h2' sx={{color: '#e5e7eb', mb: 2}}>
                    Зарегистрируйтесь, чтобы начать!
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
                        <FormInput name='userName' label='Имя пользователя'/>
                        <FormInput name='email' label='Почта' type='email'/>
                        <FormInput name='password' label='Пароль' type='password'/>
                        <FormInput
                            name='passwordConfirm'
                            label='Подтвердите парль'
                            type='password'
                        />
                        <Typography sx={{fontSize: '0.9rem', mb: '1rem'}}>
                            Уже есть аккаунт?{' '}
                            <LinkItem onClick={() => navigate('/login')}>Войти здесь</LinkItem>
                        </Typography>

                        <LoadingButton
                            variant='contained'
                            sx={{mt: 1}}
                            fullWidth
                            disableElevation
                            type='submit'
                            loading={isLoading}
                        >
                            Регистрация
                        </LoadingButton>
                    </Box>
                </FormProvider>
            </Box>
        </Container>
    );
};

export default Register;