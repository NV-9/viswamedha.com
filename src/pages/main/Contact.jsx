import React, { useState } from 'react';
import { Box, Button, Collapse, Container, FormControl, Input, InputLabel, Typography, Alert, IconButton, Card, Grid2 as Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { ApiRouter } from '../../utils/Api'; 
import { API_ENDPOINTS } from '../../utils/Mapping';
import { validateEmail } from '../../utils/Validation';

export default function Contact({ setDrawerOpen }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [errorShown, setErrorShown] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successShown, setSuccessShown] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setErrorShown(true);
            setErrorMessage('Please enter a valid email address.');
            setEmail('');
            return;
        }

        const contactData = { 
            name: name, 
            email: email, 
            subject: subject, 
            message: message 
        };
        
        ApiRouter.post(API_ENDPOINTS.CONTACT(), contactData)
            .then(response => {
                if (response.email) {
                    setSuccessShown(true);
                    setErrorShown(false);
                    setName(''); setEmail(''); setSubject(''); setMessage('');
                } else {
                    setSuccessShown(false);
                    setErrorShown(true);
                }
            })
            .catch(() => {
                setSuccessShown(false);
                setErrorShown(true);
            });
    };

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', backgroundSize: 'cover', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 64, left: 64 }}>
                <IconButton sx={{ color: 'white' }} onClick={setDrawerOpen}>
                    <MenuIcon />
                </IconButton>
            </Box>

            <Container>
                <Grid container justifyContent="center">
                    <Grid item="true" xs={12} sm={8} md={4}>
                        <Card sx={{ padding: { xs: 4, md: 3 }, maxWidth: { xs: '100%', md: '90%' }, boxShadow: 3, borderRadius: 2, color: 'white', backgroundImage: 'url("/img/Contact.jpeg")',  backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', }}>
                            <Typography variant="h5" textAlign="center" gutterBottom>
                                Contact Me
                            </Typography>

                            <Collapse in={errorShown}>
                                <Alert severity="error" sx={{ mb: 2 }} action={
                                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => setErrorShown(false)}>
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }>
                                {errorMessage} 
                                </Alert>
                            </Collapse>

                            <Collapse in={successShown}>
                                <Alert severity="success" sx={{ mb: 2 }} action={
                                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => setSuccessShown(false)}>
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }>
                                    Message sent successfully!
                                </Alert>
                            </Collapse>

                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel htmlFor="name">Name</InputLabel>
                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </FormControl>

                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </FormControl>

                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel htmlFor="subject">Subject</InputLabel>
                                    <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                                </FormControl>

                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel htmlFor="message">Message</InputLabel>
                                    <Input id="message" value={message} onChange={(e) => setMessage(e.target.value)} multiline rows={4} required />
                                </FormControl>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    type="submit"
                                    disabled={!name || !email || !subject || !message}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
