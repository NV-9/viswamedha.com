import { Box, Typography, Button, IconButton, Grid2 as Grid } from '@mui/material';
import { MenuIcon } from '../../icon/MenuIcon';
import { useState, useEffect } from 'react';
import { ApiRouter } from '../../utils/Api';
import { API_ENDPOINTS } from '../../utils/Endpoints';
import profileImage from '/img/About.png';

export default function About({ setDrawerOpen }) {
    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', backgroundSize: 'cover', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', p: 2, px: { xs: 2, sm: 2, md: 10, lg: 10}, position: 'relative', color: 'white', height: {md: '100vh', lg: '100vh'} }}>
           <IconButton sx={{ position: 'absolute', top: { xs: 16, md: 64 }, left: { xs: 16, md: 64 }, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h2" sx={{ textAlign: 'center', mt: 4, width: '100%', display: 'flex', justifyContent: 'center' }} gutterBottom>
                About
            </Typography>
            <Box sx={{ display: 'flex', flexGrow: 1, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: { xs: 'column', md: 'row'} }}>
                <Box sx={{ width: '100%', p: 2, flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box component="img" src={profileImage} alt="Profile" sx={{ height: { xs: 'auto', md: '70vh' }, width: '100%', maxWidth: '500px',  objectFit: 'cover',  borderRadius: '20px' }}/>
                </Box>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%', alignItems: { xs: 'center', sm: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' }}}>
                    <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                        I’m a third-year Computer Science student
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white', mb: 3 }}>
                        I have experience in Full Stack, Ethical Hacking, Machine Learning, Software Engineering & Web Development.
                    </Typography>
                    <Button variant="contained" color="primary" href={`/${API_ENDPOINTS.REFERENCE("cv")}`} sx={{ color: 'white'}}>
                        Download CV
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
