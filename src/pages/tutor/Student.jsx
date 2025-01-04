import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { MenuIcon } from '../../icon/MenuIcon';
import { Box, Button, Card, CardActions, CardContent, Chip, FormControl, Grid2 as Grid, IconButton, InputLabel, MenuItem, Select, Typography} from '@mui/material';

import { formatLessonDate, isLessonCompleted } from '../../utils/Helpers';
import { API_ENDPOINTS } from '../../utils/Endpoints';
import { mapping } from '../../utils/Mapping';
import { ApiRouter } from '../../utils/Api';
import { routeToLoginIfNotLoggedIn } from '../../utils/Helpers';

export default function Student({ setDrawerOpen }) {
    const { uuid } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [lessonPlans, setLessonPlans] = useState([]);
    const [selectedLessonPlan, setSelectedLessonPlan] = useState('');
    const [lessons, setLessons] = useState([]);
    const [session, setSession] = useState(null);

    useEffect(() => {
        if (uuid === undefined || uuid === null || uuid === '') navigate(mapping['Students'].getPath());
        routeToLoginIfNotLoggedIn(navigate);
        ApiRouter.get(API_ENDPOINTS.SESSION())
        .then(setSession);      
        if (uuid !== undefined && uuid !== null) {
            ApiRouter.get(API_ENDPOINTS.STUDENT(uuid))
            .then((data) => {
                if (data.detail) navigate(mapping['Students'].getPath());
                setStudent(data);
            });
        }
    }, [uuid]);

    useEffect(() => {
        if (student !== null) {
            ApiRouter.get(API_ENDPOINTS.ME())
            .then((userData) => {
                if (!userData.success) navigate(mapping['Home'].getPath());
                if (session && !session.isStaff && userData.student_uuid !== student.student_uuid) 
                    navigate(mapping['Home'].getPath());
            });
            setLessonPlans(student.lesson_plan);
            if (student.lesson_plan.length > 0) {
                setSelectedLessonPlan(student.lesson_plan[0].course.name);
                ApiRouter.get(API_ENDPOINTS.STUDENT_LESSONS(uuid)).then(setLessons);
            }
        }
    }
    , [session, student]);

    useEffect(() => {
        if (selectedLessonPlan !== '') {
            ApiRouter.get(API_ENDPOINTS.STUDENT_LESSONS(uuid)).then(setLessons);
        }
    }, [selectedLessonPlan]);

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: 'white', p: 3, px: 10 }}>
            <IconButton sx={{ position: 'absolute', top: { xs: 16, md: 64 }, left: { xs: 16, md: 64 }, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            {student && (
                <>
                    <Typography variant="h2" sx={{ textAlign: 'center', mt: 2 }} gutterBottom>
                        {student.user.first_name} {student.user.last_name}
                    </Typography>
                    { lessonPlans.length > 0 ? 
                    <>
                        <Grid xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', gap: 3, mt: 3, mb: 4, width: '100%', maxWidth: '800px', justifyContent: 'center', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
                                <FormControl fullWidth sx={{ color: 'white', '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' }}}}>
                                    <InputLabel>Lesson Plan</InputLabel>
                                    <Select value={selectedLessonPlan} onChange={(e) => setSelectedLessonPlan(e.target.value)} label="Lesson Plan">
                                        {lessonPlans.map((lessonPlan, index) => (
                                            <MenuItem key={index} value={lessonPlan.course.name}>
                                                {lessonPlan.course.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid container spacing={4}>
                            {lessons && lessons.map((lesson, index) => (
                                <Grid xs={12} sm={6} md={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Card sx={{ backgroundColor: 'rgba(20, 25, 30, 1.00)', color: 'white', width: 300}}>
                                        <CardContent>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                {formatLessonDate(lesson.start, lesson.end)}
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, mt: 1 }}>
                                                <Chip label={lesson.paid ? "Paid" : "Unpaid"} color={lesson.paid ? "success" : "primary"} />
                                                <Chip label={isLessonCompleted(lesson.end) ? "Completed" : "Upcoming"} color={isLessonCompleted(lesson.end) ? "success" : "primary"} />
                                            </Box>
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: 'space-between', p: 2, mt: 'auto' }}>
                                            <Button size="small" color="primary" onClick={() => navigate(mapping['Lesson'].getPath(lesson.lesson_uuid))}>View Lesson</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            { session && session.isStaff ? 
                                <Button size="small" color="primary" onClick={() => navigate(mapping['Students'].getPath())}>Back</Button>: 
                                <Button size="small" color="primary" onClick={() => navigate(mapping['Profile'].getPath())}>Profile</Button>
                            }
                        </Grid>
                    </> : <>
                        <Typography variant="h4" sx={{ textAlign: 'center', mt: 2 }} gutterBottom>
                            No lesson plans
                        </Typography>
                    </>}
                </>
            )}  
        </Box>
    );
}
