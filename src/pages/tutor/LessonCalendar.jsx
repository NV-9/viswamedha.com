import { Box, Typography, IconButton, Grid2 as Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function LessonCalendar({ setDrawerOpen }) {
    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: 'white', p: 3, px: 10 }}>
            <IconButton sx={{ position: 'absolute', top: { xs: 16, md: 64 }, left: { xs: 16, md: 64 }, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h2" sx={{ textAlign: 'center', mt: 2, mb: 4 }} gutterBottom>
                Lesson Planner
            </Typography>

            <Grid container spacing={2}>
                <Grid item="true" xs={12} sm={6} md={3}>
                    <Typography variant="h4" gutterBottom>
                        Incoming
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        at some point in the near future...
                    </Typography>
                </Grid>
            </Grid>
        
        </Box>
    );
}
