import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Card, CardActions, CardContent, Collapse, Grid2 as Grid, IconButton, TextField, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { ApiRouter } from '../../utils/Api';
import { API_ENDPOINTS } from '../../utils/Endpoints';
import { mapping } from '../../utils/Mapping';

export default function Reference({ setDrawerOpen }) {
    const { key } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState(null);
    const [errorShown, setErrorShown] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const defaultForm = { name: '', value: '', url: '' };
    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        if (key) {
            ApiRouter.get(API_ENDPOINTS.REFERENCE(key))
            .then(data => {
                if (data.detail) 
                    navigate(mapping['Home'].getPath());
                else if (data.url) 
                    window.location.href = data.url;
                else 
                    setValue(data.value);
            });
        }
        ApiRouter.get(API_ENDPOINTS.SESSION())
        .then(data => {
            if (!data.isAuthenticated || !data.isStaff)
                navigate(mapping['Home'].getPath());
        });
    }, [key]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const referenceRequest = () => {
        ApiRouter.post(API_ENDPOINTS.REFERENCES(), form)
        .then(data => {
            if (data.id) {
                setErrorMessage('');
                setErrorShown(false);
                setForm(defaultForm);
                navigate(mapping['References'].getPath());
            } else {
                setErrorMessage(data.name.join(', '));
                setErrorShown(true);
            } 
        });
    };

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', p: 3, px: 10 }}>
            <IconButton sx={{ position: 'absolute', top: { xs: 16, md: 64 }, left: { xs: 16, md: 64 }, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h2" sx={{ textAlign: 'center', mt: 2 }} gutterBottom>Reference</Typography>
            {key ? (
                <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                    <Grid item="true" xs={12}>
                        <Card sx={{ backgroundColor: 'rgba(20, 25, 30, 1.00)', color: 'white', width: '100%', maxWidth: 800, margin: '0 auto' }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom noWrap>
                                    {key}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 2 }}>
                                    {value ? value : 'No value set'}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                                <Button size="small" color="primary" onClick={() => navigate(mapping['Home'].getPath())}>Home</Button>
                                <Button size="small" color="primary" onClick={() => navigate(mapping['References'].getPath())}>Create</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                    <Grid item="true" xs={12}>
                        <Card sx={{ backgroundColor: 'rgba(20, 25, 30, 1.00)', color: 'white', width: '100%', maxWidth: 800, margin: '0 auto' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Create Reference
                                </Typography>
                                <Collapse in={errorShown}>
                                    <Alert variant="outlined" severity="warning" sx={{ mb: 2 }}
                                        action={
                                            <IconButton aria-label="close" color="inherit" size="small" onClick={() => setErrorShown(false)}>
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }>
                                        Could not create reference due to {errorMessage}
                                    </Alert>
                                </Collapse>
                                <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                                    <TextField label="Name" variant="outlined" fullWidth name="name" value={form.name} onChange={handleInputChange} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', input: { color: 'white' } }}/>
                                    <TextField label="Value" variant="outlined" fullWidth name="value" value={form.value} onChange={handleInputChange} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', input: { color: 'white' } }}/>
                                    <TextField label="URL" variant="outlined" fullWidth name="url" value={form.url} onChange={handleInputChange} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', input: { color: 'white' } }}/>
                                </Box>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                                <Button size="small" color="primary" onClick={referenceRequest}>Submit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}
