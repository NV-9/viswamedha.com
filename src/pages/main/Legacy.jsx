import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { API_ENDPOINTS } from '../../utils/Mapping';
import { ApiRouter } from '../../utils/Api';

export default function Course({ setDrawerOpen }) {
    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', p: 3, px: 10 }}>
            <IconButton sx={{ position: 'absolute', top: 64, left: 64, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <iframe src="/legacy/home.html" title="Legacy Home Page" style={{ width: '100%',  height: '100vh', border: 'none' }}/>
        </Box>
    );
}
