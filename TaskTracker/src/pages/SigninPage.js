import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
// hooks
import { Stack, Container, Typography, Button, IconButton, InputAdornment, TextField, Checkbox, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import useResponsive from '../hooks/useResponsive';
import Logo from '../components/logo/Logo';
// @mui
import account from '../data/account';
// components
import Iconify from '../components/iconify/Iconify';
import 'react-toastify/dist/ReactToastify.css';
// sections

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));
const validate = (account) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(account.username)) {
        toast("Email không đúng định dạng")
        return false;
    }
    if (account.password !== account.verifypassword) {
        toast("Mật khẩu không khớp")
        return false;
    }
    return true;
}

// ----------------------------------------------------------------------

export default function SigninPage() {
    const mdUp = useResponsive('up', 'md');
    const navigate = useNavigate();
    const [account2, setAccount] = useState({
        username: "",
        password: "",
        verifypassword: ""
    })
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        console.log(account2);
        // for ( const user1 of account){
        //   if( user1.username === username.current.value && user1.password === password.current.value){
        //     sessionStorage.setItem("username", username.current.value);
        //     navigate('/dashboard', { replace: true });
        //     break;
        //   }
        // }
        // account.forEach((item) => {
        if (validate(account2))
        if (account2.username === "truonghoang@gmail.com" && account2.password === "1" && account2.password === account2.verifypassword) {
            sessionStorage.setItem("username", account2.username);
            toast("Đăng ký thành công.")
            setTimeout(() => {
                navigate("/dashboard", { replace: true });
            }, 1000);
        } else {
            toast("Chưa có data, email: truonghoang@gmail.com, password: 1 ")
        }
        // })
    }

    const handleChange = (key, value) => {
        setAccount({
            ...account2,
            [key]: value
        })
    }
    return (
        <>
            <Helmet>
                <title> Login  </title>
            </Helmet>

            <StyledRoot>
                <Logo
                    sx={{
                        position: 'fixed',
                        top: { xs: 16, sm: 24, md: 40 },
                        left: { xs: 16, sm: 24, md: 40 },
                    }}
                />

                {mdUp && (
                    <StyledSection>
                        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            Hi, Welcome Back
                        </Typography>
                        <img src="/assets/illustrations/illustration_login.png" alt="login" />
                    </StyledSection>
                )}

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            Đăng ký
                        </Typography>

                        <>
                            <Stack direction="column" spacing={3}>
                                <TextField value={account2.username} onChange={(e) => handleChange("username", e.target.value)} name="email" label="Email" />

                                <TextField
                                    value={account2.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    name="password"
                                    label="Mật khẩu"
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField
                                    value={account2.verifypassword}
                                    onChange={(e) => handleChange("verifypassword", e.target.value)}
                                    name="verifypassword"
                                    label="Nhập lại mật khẩu"
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Stack>

                            <LoadingButton style={{ marginTop: "20px", marginBottom: "20px" }} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                                Đăng ký
                            </LoadingButton>

                        </>
                        <Typography variant="body2" sx={{ mb: 5 }}>
                            Bạn đã có tài khoản?
                            <Link to={"/login"}>Đăng nhập</Link>
                        </Typography>
                    </StyledContent>
                </Container>
            </StyledRoot>
            <ToastContainer />
        </>
    );
}
