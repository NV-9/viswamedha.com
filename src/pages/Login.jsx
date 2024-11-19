import { Alert, Box, Button, Collapse, Container, FormControl, IconButton, Input, InputLabel, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiRouter } from '../utils/Api';
import { API_ENDPOINTS } from '../utils/Mapping';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorShown, setErrorShown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        ApiRouter.get(API_ENDPOINTS.SESSION())
        .then(data => {
            if (data.isAuthenticated) {
                navigate('/profile/');
            }
        });
    }, []);

    const loginRequest = () => {
        const userLoginData = {
            username: username,
            password: password,
        }
        ApiRouter.post(API_ENDPOINTS.LOGIN(), userLoginData)
        .then(data => {
            if (data.success == true) {
                navigate('/profile/');
            } else {
                setPassword('');
                setErrorShown(true);
            }
        })
    }

    return (
        <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Box component="form" sx={{ width: '100%', padding: 4, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Login
                </Typography>
                <Collapse in={errorShown}>
                <Alert variant="outlined" severity="warning" sx={{ mb: 2 }}
                    action={
                        <IconButton aria-label="close" color="inherit" size="small" onClick={() => setErrorShown(false)}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                    Incorrect username or password!
                </Alert>
            </Collapse>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete='on' />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='on'/>
                </FormControl>
                <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }} onClick={loginRequest} disabled={!username || !password}>
                    Login
                </Button>
                <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate('/signup/')}>
                    Sign Up
                </Button>
            </Box>
        </Container>
    );
}
