import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, IconButton, Card, Grid2 as Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ApiRouter } from '../utils/Api'; 
import { API_ENDPOINTS } from '../utils/Mapping';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Reference({ setDrawerOpen }) {
    const { key } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState(null);

    useEffect(() => {
        if (key) {
            ApiRouter.get(API_ENDPOINTS.REFERENCE(key))
            .then(data => {
                if (!data.detail) {
                    if (data.url) {
                        window.location.href = data.url;
                    } else {
                        setValue(data.value);
                    }
                }
            });
        } else {
            ApiRouter.get(API_ENDPOINTS.SESSION())
            .then(data => {
                if (!data.isStaff) {
                    navigate('/');
                }
            });
        }
    }, [key]);
   
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
                        <Card sx={{ padding: {xs: 4, md: 3},  maxWidth: { xs: '100%', md: '90%' }, boxShadow: 3, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                            {key && (<>
                                <Typography variant="h5" textAlign="center" gutterBottom>
                                    Reference - {key}
                                </Typography>
                                <Typography variant="body1" textAlign="center" gutterBottom>
                                    {value}
                                </Typography>
                            </>)}
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
