import { Alert, Button, Box, Card, CardContent, Collapse, Container, FormControl, Grid2 as Grid, IconButton, Input, InputLabel, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MenuIcon } from '../../icon/MenuIcon';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiRouter } from '../../utils/Api';
import { API_ENDPOINTS } from '../../utils/Endpoints';
import { mapping } from '../../utils/Mapping';
import { validatePassword } from '../../utils/Validation';
import { routeToLoginIfNotLoggedIn } from '../../utils/Helpers';

export default function Signup({ setDrawerOpen,  setAccessChange, accessChange}) {
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [errorShown, setErrorShown] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        routeToLoginIfNotLoggedIn(navigate);
    }, []);

    useEffect(() => {
        const fieldValues = [oldPassword, password, confirmPassword];
        setDisabled(!fieldValues.every((value) => value));
    }, [oldPassword, password, confirmPassword])

    const changePasswordRequest = () => {        
        if (!validatePassword(password)) {
            setErrorMessage('Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character. Special characters include: !@#$%^&*()-_=+[]{};:\'",.<>?/\\|`~');
            setErrorShown(true);
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            setErrorShown(true);
            return;
        }
        const passwordData = {
            old_password: oldPassword,
            password: password,
            confirm_password: confirmPassword
        }
        ApiRouter.post(API_ENDPOINTS.CHANGE_PASSWORD(), passwordData)
        .then(data => {
            if (data.success == true) {
                setAccessChange(!accessChange);
                navigate(mapping['Login'].getPath() + '?password_changed=true');
            } else {
                setOldPassword('');
                setPassword('');
                setConfirmPassword('');
                setErrorMessage(data.detail);
                setErrorShown(true);
            }
        })
    }

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', p: 0, px: { xs: 2, sm: 3 } }}>
            <IconButton sx={{ position: 'absolute', top: { xs: 16, md: 64 }, left: { xs: 16, md: 64 }, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Card sx={{ width: '100%', padding: 4, boxShadow: 3, borderRadius: 2 }}>
                    <CardContent>
                        <form>
                            <Typography variant="h5" textAlign="center" gutterBottom>
                                Change Password
                            </Typography>
                            <Collapse in={errorShown}>
                                <Alert
                                    severity="error"
                                    action={
                                        <IconButton aria-label="close" color="inherit" size="small" onClick={() => setErrorShown(false)}>
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    {errorMessage}
                                </Alert>
                            </Collapse>
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="firstName">Old Password</InputLabel>
                                        <Input id="firstName" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} autoComplete="on" />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="on" />
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                                        <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="on" />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button variant="contained" color="white" fullWidth sx={{ mb: 2 }} onClick={changePasswordRequest} disabled={disabled}>
                                Change Password
                            </Button>
                            <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate(mapping['Profile'].getPath())}>
                                Return to Profile
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}