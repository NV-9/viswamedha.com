import { 
    Typography, Box, Grid2 as Grid, IconButton, Card, CardContent, CardActions, 
    FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

import { API_ENDPOINTS } from '../../utils/Mapping';
import { ApiRouter } from '../../utils/Api';

export default function Courses({ setDrawerOpen }) {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [levels, setLevels] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');

    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        ApiRouter.get(API_ENDPOINTS.COURSES())
            .then(setCourses)
            .catch((err) => console.error('Error fetching courses:', err));

        ApiRouter.get(API_ENDPOINTS.SUBJECTS())
            .then(setSubjects)
            .catch((err) => console.error('Error fetching subjects:', err));

        ApiRouter.get(API_ENDPOINTS.LEVELS())
            .then(setLevels)
            .catch((err) => console.error('Error fetching levels:', err));
    }, []);

    useEffect(() => {
        let filtered = courses;

        if (selectedSubject) {
            filtered = filtered.filter(course => course.subject === selectedSubject);
        }

        if (selectedLevel) {
            filtered = filtered.filter(course => course.level === selectedLevel);
        }

        setFilteredCourses(filtered);
    }, [courses, selectedSubject, selectedLevel]);

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', p: 3, px: 10 }}>
            <IconButton sx={{ position: 'absolute', top: 64, left: 64, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>

            <Typography variant="h2" sx={{ textAlign: 'center', mt: 2 }} gutterBottom>
                View Courses
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, mt: 3, mb: 4, width: '100%', maxWidth: '800px', justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
                <FormControl fullWidth sx={{ color: 'white', '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' }} }}>
                    <InputLabel>Subject</InputLabel>
                    <Select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} label="Subject">
                        <MenuItem value="">All Subjects</MenuItem>
                        {subjects.map((subject, index) => (
                            <MenuItem key={index} value={subject.name}>
                                {subject.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ color: 'white', '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}>
                    <InputLabel>Level</InputLabel>
                    <Select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} label="Level">
                        <MenuItem value="">All Levels</MenuItem>
                        {levels.map((level, index) => (
                            <MenuItem key={index} value={level.name}>
                                {level.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Grid container spacing={4}>
                {filteredCourses.map((course, index) => (
                    <Grid xs={12} sm={6} md={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Card sx={{ backgroundColor: 'rgba(20, 25, 30, 1.00)', color: 'white', width: 300}}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    {course.name}
                                </Typography>
                                <Typography variant="body2">
                                    {`${course.description.substring(0, 30)}...`}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                                <Chip label={`£${course.cost}`} sx={{ mb: 1, color: 'white', borderColor: 'white' }} color='white' variant='outlined'/>
                                <Button size="small" color="primary" onClick={() => navigate(`/course/${course.id}`)}>View More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
