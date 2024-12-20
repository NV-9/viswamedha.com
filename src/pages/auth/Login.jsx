import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Card, CardContent, Collapse, Container, FormControl, Grid2 as Grid, IconButton, Input, InputLabel, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { ApiRouter } from '../../utils/Api';
import { API_ENDPOINTS, mapping } from '../../utils/Mapping';

export default function Login({ setDrawerOpen }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorShown, setErrorShown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        ApiRouter.get(API_ENDPOINTS.SESSION()).then(data => {
            if (data.isAuthenticated) navigate('/profile/');
        });
    }, []);

    const loginRequest = () => {
        const userLoginData = { username, password };
        ApiRouter.post(API_ENDPOINTS.LOGIN(), userLoginData).then(data => {
            if (data.success) navigate('/profile/');
            else {
                setPassword('');
                setErrorShown(true);
            }
        });
    };

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', p: 0, px: { xs: 2, sm: 3 } }}>
            <IconButton sx={{ position: 'absolute', top: 64, left: 64, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Card sx={{ width: '100%', padding: 4, boxShadow: 3, borderRadius: 2 }}>
                    <CardContent>
                        <form>
                            <Typography variant="h5" textAlign="center" gutterBottom>Login</Typography>
                            <Collapse in={errorShown}>
                                <Alert variant="outlined" severity="warning" sx={{ mb: 2 }} action={
                                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => setErrorShown(false)}>
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }>
                                    Incorrect username or password!
                                </Alert>
                            </Collapse>
                            <Grid container spacing={2}>
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <InputLabel htmlFor="username">Username</InputLabel>
                                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="on" />
                                </FormControl>
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="on" />
                                </FormControl>
                            </Grid>
                            <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }} onClick={loginRequest} disabled={!username || !password}>Login</Button>
                            <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate(mapping['Signup'].getPath())}>Sign Up</Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
