import { Box, IconButton, Button, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Legacy({ setDrawerOpen }) {
    const handleOpenInNewTab = () => {
        window.open('/legacy/home.html', '_blank');
    };
    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', p: 2, px: {sm: 2, md: 10, lg: 10} }}>
            <IconButton sx={{ position: 'absolute', top: { xs: 16, md: 64 }, left: { xs: 16, md: 64 }, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <iframe src="/legacy/home.html" title="Legacy Home Page" style={{ width: '100%',  height: '100vh', border: 'none' }}/>
            <Typography variant="body1" sx={{ mt: 2 }}>
                If the legacy page fails to load or displays incorrectly,{' '}
                <Button color="secondary" onClick={handleOpenInNewTab}>
                    open it in a new tab
                </Button>
                .
            </Typography>
        </Box>
    );
}
