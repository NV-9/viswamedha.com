import { Alert, FormControl, Input, InputLabel, Container, Button, Box, Typography, IconButton, Collapse} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiRouter } from '../utils/Api';
import { ENDPOINTS } from '../utils/Endpoints';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorShown, setErrorShown] = useState(false);
    const navigate = useNavigate();

    const loginRequest = () => {
        const userLoginData = {
            username: username,
            password: password,
        }
        ApiRouter.post(ENDPOINTS.LOGIN(), userLoginData)
        .then(data => {
            if (data.success == true) {
                navigate('/profile/');
            } else {
                setUsername('');
                setPassword('');
                setErrorShown(true);
            }
        })
    }

    return (
        <Container 
            maxWidth="xs" 
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
        >
            <Box 
                component="form" 
                sx={{ width: '100%', padding: 4, boxShadow: 3, borderRadius: 2 }}
            >
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Login
                </Typography>
                <Collapse in={errorShown}>
                <Alert
                variant="outlined" severity="warning"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setErrorShown(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
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
                <Button variant="outlined" color="secondary" fullWidth>
                    Sign Up
                </Button>
            </Box>
        </Container>
    );
}
