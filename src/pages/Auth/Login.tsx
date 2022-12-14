import {ChangeEvent, MouseEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {loginRequest, LoginUserState} from "../../shared/services/authService";
import {
    Box,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack, TextField,
    Typography
} from "@mui/material";
import {useForm} from "react-hook-form";
import {Visibility, VisibilityOff} from "@mui/icons-material";



interface State {
    email: string;
    password: string;
    showPassword: boolean;
}
export const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [values, setValues] = useState<State>({
        email: '',
        password: '',
        showPassword: false,
    });
    const navigate = useNavigate();


    const handleChange =
        (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const login = async (data: LoginUserState) => {
        const response = await loginRequest(data);
        console.log(response);
        navigate('/');
    }
    const onSubmit = () => {
        login(values);
    };


    return (
        <Stack
            width={'100%'}
            height={'100vh'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                    width: '100%',
                    height: '50%',
                    maxWidth: 500,
                    padding: 3,
                    borderRadius: 1,
                    boxShadow: 1,
                    backgroundColor: '#2c2b2b',
                }}
            >
                <Box component={'form'}
                     display={'flex'}
                     justifyContent={'center'}
                     alignItems={'center'}
                     flexDirection={'column'}
                     onSubmit={handleSubmit(onSubmit)}
                >
                    <Typography variant={'h4'} sx={{
                        marginBottom: 4,
                    }}>
                        Iniciar sesión
                    </Typography>
                    <TextField
                        required
                        sx={{ m: 1, width: '35ch' }}
                        {...register("email", { required: true })}
                        id="outlined-required"
                        label="Email"
                        onChange={handleChange('email')}
                    />
                    {errors.email && <span>Se requiere el email</span>}
                    <FormControl
                        required
                        sx={{ m: 1, width: '35ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            {...register("password", { required: true })}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Input
                        sx={{ m: 2 }}
                        type="submit" />
                </Box>
            </Box>
        </Stack>
    );
}