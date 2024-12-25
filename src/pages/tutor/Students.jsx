import { Box, Button, Grid2 as Grid, IconButton, Card, CardContent, CardActions, Chip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import { API_ENDPOINTS, mapping } from '../../utils/Mapping';
import { ApiRouter } from '../../utils/Api';
import { routeToHomeIfNotAdmin } from '../../utils/Helpers';

export default function Courses({ setDrawerOpen }) {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        routeToHomeIfNotAdmin(navigate);
        ApiRouter.get(API_ENDPOINTS.STUDENTS())
        .then(setStudents);
    }, []);

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', p: 3, px: {sm: 4, md: 10} }}>
            <IconButton sx={{ position: 'absolute', top: 64, left: 64, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h2" sx={{ textAlign: 'center', mt: 2 }} gutterBottom>
                Students
            </Typography>
            <Grid container spacing={4}>
                {students && students.map((student, index) => (
                    <Grid xs={12} sm={6} md={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Card sx={{ backgroundColor: 'rgba(20, 25, 30, 1.00)', color: 'white', width: 300, display: 'flex', flexDirection: 'column'}}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    {student.user.first_name} {student.user.last_name}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Courses: 
                                </Typography>
                                {student.lesson_plan && (student.lesson_plan.length > 0 ? student.lesson_plan.map((lesson_plan, index) => (
                                    <Chip key={lesson_plan.course.name} label={lesson_plan.course.name} sx={{ mb: 1, color: 'white', borderColor: 'white' }} color='white' variant='outlined' onClick={() => navigate(mapping['Course'].getPath(lesson_plan.course.id))}/>
                                ))
                                : <Typography variant="body2" sx={{ mb: 1 }}>No courses</Typography>)}
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between', p: 2, mt: 'auto' }}>
                                <Button size="small" color="primary" onClick={() => navigate(mapping['Student'].getPath(student.student_uuid))}>View Lessons</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
