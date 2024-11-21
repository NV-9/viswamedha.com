import { Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { ApiRouter } from "../../utils/Api";
import { API_ENDPOINTS } from "../../utils/Mapping";

export default function Profile() {
    const navigate = useNavigate();

    useEffect(() => {
        ApiRouter.get(API_ENDPOINTS.SESSION())
        .then(data => {
            if (!data.isAuthenticated) {
                navigate('/login/');
            }
        });
    }, []);

    const logout = () => {
        ApiRouter.get(API_ENDPOINTS.LOGOUT())
        .then(_ => {
            navigate('/');
        })
    }

    return (
        <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
             <Button variant="outlined" onClick={logout}>
                Logout
            </Button>
        </Container>
    )
}