import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiRouter } from '../utils/Api';
import { API_ENDPOINTS } from '../utils/Mapping';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        ApiRouter.get(API_ENDPOINTS.SESSION())
        .then(data => {
            if (data.isAuthenticated) {
                ApiRouter.get(API_ENDPOINTS.LOGOUT())
                .then(data => {
                    if (data.success == true) {
                        navigate('/');
                    }
                });
            }
        });
        navigate('/');
    }, []);



    return (
        <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            
        </Container>
    );
}
