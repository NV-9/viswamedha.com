import { FormControl, Input, InputLabel, Container, Button, Box, Typography } from '@mui/material';

export default function Login() {
    return (
        <Container 
            maxWidth="xs" 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh' 
            }}
        >
            <Box 
                component="form" 
                sx={{ 
                    width: '100%', 
                    padding: 4, 
                    boxShadow: 3, 
                    borderRadius: 2 
                }}
            >
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Login
                </Typography>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" type="password" />
                </FormControl>
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ mb: 2 }}
                >
                    Login
                </Button>
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                >
                    Sign Up
                </Button>
            </Box>
        </Container>
    );
}
