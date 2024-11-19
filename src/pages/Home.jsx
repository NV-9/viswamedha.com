import { Box, Typography, IconButton, Grid2 as Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { ReactTyped } from 'react-typed';
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from 'react';
import { API_ENDPOINTS } from '../utils/Mapping';
import { ApiRouter } from '../utils/Api';

const mapping = {
    'linkedin': LinkedInIcon,
    'facebook': FacebookIcon,
    'instagram': InstagramIcon,
    'github': GitHubIcon,
    'google': MailOutlineIcon
}

export default function Home({ setDrawerOpen }) {
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
            <Grid container direction="column" alignItems="flex-start">
                <Typography variant="h2" sx={{ color: 'white', mb: 1 }}>
                    I'm Viswamedha Nalabotu
                </Typography>
                <Typography variant="h3" sx={{ color: 'white', mb: 2 }}>
                    a <ReactTyped strings={["Student", "Developer", "Blogger", "Freelancer", "Photographer", "Gamer"]} typeSpeed={100} backSpeed={50} loop />
                </Typography>
            </Grid>
            <Grid container direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                {socialLinks && Object.keys(socialLinks).map((key) => {
                    const Icon = mapping[key];
                    return (
                        <IconButton key={key} sx={{color: '#37EBF3' }} href={socialLinks[key]} target="_blank">
                            {Icon && <Icon />} 
                        </IconButton>
                    );
                })}
            </Grid>
        </Box>
    );
}
