import { Button, Typography, Box, Grid2 as Grid } from '@mui/material';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import { ENDPOINTS } from '../utils/Endpoints';
import { ApiRouter } from '../utils/Api';

export default function Courses({ setDrawerOpen }) {
    const navigate = useNavigate();

  


    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', backgroundSize: 'cover', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 3, pl: 10, position: 'relative', color: 'white' }}>
        <IconButton sx={{ position: 'absolute', top: 64, left: 64, color: 'white' }} onClick={setDrawerOpen}>
             <MenuIcon />
         </IconButton>
            <Typography variant="h2" sx={{ alignSelf: 'center', textAlign: 'center', width: '100%', mt: 2 }} gutterBottom>
                View Courses
            </Typography>

            <Grid container justifyContent="center">
                <Grid item="true" xs={12} md={8}>
                    <Typography variant="body1" align="justify">
                       Courses
                    </Typography>
                </Grid>
            </Grid>

        </Box>
    );
};

