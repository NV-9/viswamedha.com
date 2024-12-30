import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography, IconButton, Card, Grid2 as Grid } from '@mui/material';
import { MenuIcon } from '../icon/MenuIcon';

import { mapping } from '../utils/Mapping';

export default function PageNotFound({ setDrawerOpen }) {
    const navigate = useNavigate();

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', backgroundSize: 'cover', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
           <IconButton sx={{ position: 'absolute', top: { xs: 16, md: 64 }, left: { xs: 16, md: 64 }, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <Container>
                <Grid container justifyContent="center">
                    <Grid item="true" xs={12} sm={8} md={4}>
                        <Card sx={{ padding: { xs: 4, md: 3 }, maxWidth: { xs: '100%', md: '90%' }, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h5" textAlign="center" gutterBottom>
                                404 Error
                            </Typography>
                            <Typography variant="body1" textAlign="center" gutterBottom>
                                The page you are looking for does not exist.
                            </Typography>
                            <Button variant="contained" fullWidth onClick={() => navigate(mapping['Home'].getPath())} sx={{ mt: 2 }}>
                                Click here to go back to the home page
                            </Button>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
