import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardActions, CardContent, Chip, Grid2 as Grid, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { API_ENDPOINTS } from '../../utils/Endpoints';
import { mapping } from '../../utils/Mapping';
import { ApiRouter } from '../../utils/Api';

export default function Course({ setDrawerOpen }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        if (id !== undefined && id !== null) {
            ApiRouter.get(API_ENDPOINTS.COURSE(id))
            .then(course => setCourse(course))
            .catch((err) => console.error('Error fetching course:', err));
        }
    }, [id]);

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', p: 3, px: 10 }}>
            <IconButton sx={{ position: 'absolute', top: { xs: 16, md: 64 }, left: { xs: 16, md: 64 }, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            {course && (
                <>
                    <Typography variant="h2" sx={{ textAlign: 'center', mt: 2 }} gutterBottom>
                        {course.name}
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid xs={12} sm={6} md={3} key={course.name} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Card sx={{ backgroundColor: 'rgba(20, 25, 30, 1.00)', color: 'white'}}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {course.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {course.description}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 2 }}>
                                        Note: Lessons are typically 1 hour long and are tailored to the student's needs, preferably stated in advance. All lessons 
                                        are conducted online, the exact platform will be discussed with the student. Special requests can be made for in-person lessons, 
                                        however, this is subject to availability and location.
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 2 }}>
                                        The pricing referenced here is the typical cost for this course. However, this can vary depending on various factors
                                        such as the students's current level, their learning needs, and in rare instances, the complexity of the course. 
                                        For all lessons, payment isn't required until after a lesson, however, if lessons are cancelled frequently without sufficient notice, 
                                        pre payment may be required. Payment can be made via bank transfer or PayPal. If you have any questions or concerns, please feel free to
                                        contact me.
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                                    <Chip label={`£${course.cost}`} sx={{ mb: 1, color: 'white', borderColor: 'white' }} color='white' variant='outlined'/>
                                    <Button size="small" color="primary" onClick={() => navigate(mapping['Courses'].getPath())}>Back</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </>
            )}  
        </Box>
    );
}
