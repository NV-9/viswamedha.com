import { Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ApiRouter } from "../utils/Api";
import { ENDPOINTS } from "../utils/Endpoints";

export default function Profile() {
    const navigate = useNavigate();

    const logout = () => {
        ApiRouter.get(ENDPOINTS.LOGOUT())
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