import { Button, Typography, Box, Grid2 as Grid } from '@mui/material';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import { API_ENDPOINTS } from '../../utils/Mapping';
import { ApiRouter } from '../../utils/Api';

export default function Tutoring({ setDrawerOpen }) {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        ApiRouter.get(API_ENDPOINTS.REVIEWS())
        .then(setReviews);
    }, []);


    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', backgroundSize: 'cover', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 3, pl: 10, position: 'relative', color: 'white' }}>
        <IconButton sx={{ position: 'absolute', top: 64, left: 64, color: 'white' }} onClick={setDrawerOpen}>
             <MenuIcon />
         </IconButton>
            <Typography variant="h2" sx={{ alignSelf: 'center', textAlign: 'center', width: '100%', mt: 2 }} gutterBottom>
                Welcome
            </Typography>

            <Grid container justifyContent="center">
                <Grid item="true" xs={12} md={8}>
                    <Typography variant="body1" align="justify">
                        Hey there, welcome to my tutoring page. I'm a tutor with over <Box component="span" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>4</Box> years of experience 
                        in teaching students from various backgrounds. I specialize in teaching Mathematics, Physics, and Computer Science for various exam boards, with 
                        some additional courses, listed in the courses page. I am currently undertaking a Bachelor's degree in Artificial Intelligence and Computer Science.
                        I have taught over <Box component="span" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>15</Box> students and helped them achieve their academic goals. I believe that every 
                        student has the potential to succeed and I'm here to help you achieve your absolute best. I offer personalized tutoring sessions tailored to your needs.
                        Whether you need help with homework, test preparation, or understanding complex concepts, I'm here to help you succeed. I look forward to working with 
                        you and helping you achieve your academic goals.
                    </Typography>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Grid item="true">
                    <Button variant="contained" color="primary" onClick={() => navigate("/courses")}>
                        View Courses
                    </Button>
                </Grid>
            </Grid>

            {reviews && (
                <>
                    <Grid container justifyContent="center" sx={{ mt: 4 }}>
                        <Grid item="true" xs={12} md={8}>
                            <Typography variant="h4" gutterBottom>
                                Reviews:
                            </Typography>
                        </Grid>
                    </Grid>

                    {reviews.map(review => (
                        <Grid container key={review.initials} justifyContent="center" sx={{ mb: 3 }}>
                            <Grid item="true" xs={12} md={8}>
                                <Typography variant="h5" gutterBottom>
                                    {review.initials}
                                </Typography>
                                <Typography variant="body1">
                                    {review.review}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))}
                </>
            )}
        </Box>
    );
};

