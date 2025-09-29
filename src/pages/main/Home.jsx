import { Box, Typography, IconButton, Grid2 as Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { ReactTyped } from 'react-typed';
import { useState, useEffect } from "react";
import { MenuIcon } from '../../icon/MenuIcon';
import { SmokeScene } from 'react-smoke';
import { API_ENDPOINTS } from '../../utils/Endpoints';

const mapping = {
    'linkedin': LinkedInIcon,
    'facebook': FacebookIcon,
    'instagram': InstagramIcon,
    'github': GitHubIcon
};

export default function Home({ setDrawerOpen }) {    
    return (
        <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            <SmokeScene style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />
            <Box sx={{ backgroundColor: 'rgba(5,10,14,0.85)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', md: 'flex-start' },textAlign: { xs: 'center', md: 'left' }, p: 3, pl: { md: 6, lg: 6 }, position: 'relative', zIndex: 1 }}>
                <IconButton sx={{ position: 'absolute', top: { xs: 16, md: 64 }, left: { xs: 16, md: 64 }, color: 'white' }} onClick={setDrawerOpen}>
                    <MenuIcon />
                </IconButton>
                <Grid container direction="column" alignItems={{ xs: 'center', md: 'flex-start' }}>
                    <Typography variant="h2" sx={{ color: 'white', mb: 1 }}>
                        I'm Viswamedha Nalabotu
                    </Typography>
                    <Typography variant="h3" sx={{ color: 'white', mb: 2 }}>
                        a <ReactTyped strings={["Student", "Developer", "Blogger", "Freelancer", "Photographer", "Gamer"]} typeSpeed={100} backSpeed={50} loop />
                    </Typography>
                    <Grid container direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }} sx={{ mt: 2 }}>
                        {mapping && Object.keys(mapping).map((key) => {
                            const Icon = mapping[key];
                            return (
                                <IconButton key={key} sx={{ color: '#37EBF3' }} href={API_ENDPOINTS.REFERENCE(key)} target="_blank">
                                    {Icon && <Icon />} 
                                </IconButton>
                            );
                        })}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
