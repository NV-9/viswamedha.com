import { Alert, Button, Collapse, IconButton } from '@mui/material';
import { Container, Box, Typography, FormControl, InputLabel, Input } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiRouter } from '../../utils/Api';
import { API_ENDPOINTS } from '../../utils/Mapping';
import { validateEmail, validatePassword } from '../../utils/Validation';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [errorShown, setErrorShown] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        ApiRouter.get(API_ENDPOINTS.SESSION())
        .then(data => {
            if (data.isAuthenticated) {
                navigate('/profile/');
            }
        });
    }, []);

    useEffect(() => {
        const fieldValues = [username, emailAddress, firstName, lastName, dateOfBirth, password, confirmPassword];
        setDisabled(!fieldValues.every((value) => value));
    }, [username, emailAddress, firstName, lastName, dateOfBirth, password, confirmPassword])

    const signupRequest = () => {
        if (!validateEmail(emailAddress)) {
            setErrorMessage('Please enter a valid email address.');
            setErrorShown(true);
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage('Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.');
            setErrorShown(true);
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            setErrorShown(true);
            return;
        }
        const userSignupData = {
            username: username,
            email_address: emailAddress,
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
            password: password,
            confirm_password: confirmPassword
        }
        ApiRouter.post(API_ENDPOINTS.SIGNUP(), userSignupData)
        .then(data => {
            if (data.success == true) {
                navigate('/profile/');
            } else {
                setPassword('');
                setConfirmPassword('');
                setErrorMessage(data.detail);
                setErrorShown(true);
            }
        })
    }

    return (
        (<Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Box component="form" sx={{ width: '100%', padding: 4, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Sign Up
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
                    <Grid size={{ xs: 12,  md: 6  }}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="on" />
                        </FormControl>
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="emailAddress">Email Address</InputLabel>
                            <Input id="emailAddress" type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} autoComplete="on" />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="on" />
                        </FormControl>
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="on" />
                        </FormControl>
                    </Grid>
                </Grid>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel htmlFor="dateOfBirth">Date Of Birth</InputLabel>
                    <Input id="dateOfBirth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} autoComplete="on" />
                </FormControl>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="on" />
                        </FormControl>
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="on" />
                        </FormControl>
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }} onClick={signupRequest} disabled={disabled}>
                    Sign Up
                </Button>
                <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate('/login/')}>
                    Login
                </Button>
            </Box>
        </Container>)
    );
}
