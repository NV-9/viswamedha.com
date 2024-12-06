import { Box, Typography, Button, IconButton, Grid2 as Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';
import { ApiRouter } from '../../utils/Api';
import { API_ENDPOINTS } from '../../utils/Mapping';
import profileImage from '/img/About.png';

export default function About({ setDrawerOpen }) {
    const [socialLinks, setSocialLinks] = useState(null);

    useEffect(() => {
        ApiRouter.get(API_ENDPOINTS.SOCIALS())
        .then(setSocialLinks);
    }, []);

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', backgroundSize: 'cover', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', p: 3, pl: 10, position: 'relative' }}>
           <IconButton sx={{ position: 'absolute', top: 64, left: 64, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h2" sx={{ color: 'white', mb: 4, textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'center'}}>
                About
            </Typography>
            <Grid container spacing={12} alignItems="center" justifyContent="center" sx={{ padding: '20px', flexDirection: { xs: 'column', sm: 'row' }}}>
                <Grid item="true" xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', order: { xs: 1, sm: 0 }}} >
                    <Box component="img" src={profileImage} alt="Profile" sx={{ borderRadius: '20px', boxShadow: 3, width: { xs: '80%', sm: '100%' }, maxWidth: { xs: '300px', sm: '500px' }, height: 'auto' }}/>
                </Grid>
                <Grid item="true" xs={12} sm={6} sx={{ textAlign: { xs: 'center', sm: 'left' }, padding: { xs: 2, sm: 1 }}}>
                    <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                        I’m a third-year Computer Science student
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white', mb: 3 }}>
                        I have experience in Full Stack, Ethical Hacking, Machine Learning, Software Engineering & Web Development.
                    </Typography>
                    <Button variant="contained" color="primary" href={socialLinks ? socialLinks.cv : ''} sx={{ color: 'white', mb: 2 }}>
                        Download CV
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
