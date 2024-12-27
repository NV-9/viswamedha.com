import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Box, Card, CardContent, Collapse, FormControl, Grid2 as Grid, IconButton, Input, InputLabel, Snackbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { ApiRouter } from "../../utils/Api";
import { API_ENDPOINTS, mapping } from "../../utils/Mapping";

export default function Profile({ setDrawerOpen }) {
    const navigate = useNavigate();
    const [userUUID, setUserUUID] = useState('');
    const [username, setUsername] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [errorShown, setErrorShown] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [isStaff, setIsStaff] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const [studentUUID, setStudentUUID] = useState(null);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    useEffect(() => {
        ApiRouter.get(API_ENDPOINTS.SESSION())
        .then(data => {
            if (!data.isAuthenticated) {
                navigate(mapping['Login'].getPath());
            }
        });
        ApiRouter.get(API_ENDPOINTS.ME())
        .then(data => {
            if (data.success) {
                setUserUUID(data.user_uuid);
                setUsername(data.username);
                setEmailAddress(data.email_address);
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setDateOfBirth(data.date_of_birth);
                setIsStaff(data.is_staff);
                setIsStudent(data.is_student);
            }
        });
    }, []);

    useEffect(() => {
        if (isStudent === true) {
            ApiRouter.get(API_ENDPOINTS.STUDENT_BY_USER(userUUID)) 
            .then(data => {
                if (data.length === 0) {
                    setErrorMessage("Student data not found");
                    setErrorShown(true);
                }
                else {
                    setStudentUUID(data[0].student_uuid);
                }
            });
        }
    }, [isStudent]);

    useEffect(() => {
        const fieldValues = [firstName, lastName, dateOfBirth];
        setDisabled(!fieldValues.every((value) => value));
    }, [firstName, lastName, dateOfBirth])

    const updateUserData = () => {
        const userProfileData = {
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
        }
        ApiRouter.patch(API_ENDPOINTS.USER(userUUID), userProfileData)
        .then(data => {
            if (data.detail) {
                setErrorMessage(data.detail);
                setErrorShown(true);
            }
            else {
                setErrorMessage('');
                setErrorShown(false);
                setOpen(true);
            }
        });
    };

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', p: 2, px: {xs: 2, sm: 3} }}>
            <IconButton sx={{ position: 'absolute', top: 64, left: 64, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>

            <Typography variant="h2" sx={{ textAlign: 'center'}} gutterBottom>Profile</Typography>

            <Box sx={{ display: 'flex', flexGrow: 1, mt: 2, width: '100%', justifyContent: 'center', flexDirection: { xs: 'column', md: 'row' } }} spacing={4}>
                <Box sx={{ width: '100%', borderRadius: 2, display: 'flex', flexDirection: 'column', mb: { xs: 4, md: 0 } }}>
                    <Card sx={{ width: '100%', padding: 2, boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                            <form>
                                <Typography variant="h5" textAlign="center" gutterBottom>
                                    Profile Details
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
                                            <Input id="username" value={username} disabled/>
                                        </FormControl>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="emailAddress">Email Address</InputLabel>
                                            <Input id="emailAddress" type="email" value={emailAddress} disabled/>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ mb: 3 }}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                                            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="on" />
                                        </FormControl>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="on" />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <InputLabel htmlFor="dateOfBirth" shrink>Date Of Birth</InputLabel>
                                    <Input id="dateOfBirth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} autoComplete="on" />
                                </FormControl>
                                <Button variant="contained" color="white" fullWidth sx={{ mb: 2 }} onClick={updateUserData} disabled={disabled}>
                                    Update Details
                                </Button>
                                <Button variant="contained" color="white" fullWidth sx={{ mb: 2 }} onClick={() => navigate(mapping['ChangePassword'].getPath())} disabled={disabled}>
                                    Change Password
                                </Button>
                                <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate(mapping['Logout'].getPath())}>
                                    Logout
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%', mt: { xs: 2, md: 0 }, ml: { md: 2 } }}>
                    <Card sx={{ width: '100%', padding: 4, boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h5" textAlign="center" gutterBottom>
                                Roles
                            </Typography>
                            <Typography variant="h6" textAlign="center" gutterBottom>
                                User {isStaff && ' | Staff'} {isStudent && ' | Student'}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ width: '100%', padding: 4, boxShadow: 3, borderRadius: 2, mt: 2 }}>
                        <CardContent>
                            <Typography variant="h5" textAlign="center" gutterBottom>
                                Access
                            </Typography>
                            {(isStudent || isStaff)  && (<>
                                <Button variant="contained" color="primary" fullWidth onClick={() => navigate(mapping['LessonCalendar'].getPath())} sx={{ mb: 2 }}>
                                    Lesson Calendar
                                </Button>
                            </>)}
                            {isStudent && (<>
                                <Button variant="contained" color="primary" fullWidth onClick={() => navigate(mapping['Student'].getPath(studentUUID))} sx={{ mb: 2 }}>
                                    Lessons
                                </Button>
                            </>)}
                            {isStaff && (<>
                                <Button variant="contained" color="primary" fullWidth onClick={() => navigate(mapping['References'].getPath())} sx={{ mb: 2 }}>
                                    References
                                </Button>
                            </>)}
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Profile data updated successfully!
                </Alert>
            </Snackbar>
        </Box>
    )
}