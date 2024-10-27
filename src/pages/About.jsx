import { Box, Typography, Button, IconButton, Grid2 as Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import profileImage from '/img/About.png';

export default function About({ setDrawerOpen }) {
    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', backgroundSize: 'cover', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', p: 3, pl: 10, position: 'relative' }}>
           <IconButton sx={{ position: 'absolute', top: 24, left: 24, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h2" sx={{ color: 'white', mb: 4, textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'center'}}>
                About
            </Typography>
            <Grid container spacing={8} alignItems="center" justifyContent="center" sx={{ padding: '20px', flexDirection: { xs: 'column', sm: 'row' }}}>
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
                    <Button variant="contained" color="primary">
                        Download CV
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}