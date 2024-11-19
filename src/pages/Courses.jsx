import { Typography, Box, Grid2 as Grid, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

import { API_ENDPOINTS } from '../utils/Mapping';
import { ApiRouter } from '../utils/Api';


export default function Courses({ setDrawerOpen }) {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [levels, setLevels] = useState([]);
 
    const handleSubjectClick = (name) => {
        setSelectedSubject(name === selectedSubject ? null : name);
    }

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
        if (subjects.length > 0) {
            setSelectedSubject(subjects[0].name);
            setSelectedCourses(courses.filter(course => course.subject === selectedSubject));
        }
    }, [subjects]);

    useEffect(() => {
        if (selectedSubject) {
            setSelectedCourses(courses.filter(course => course.subject === selectedSubject));
        }
    }, [selectedSubject]);

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', p: 3, px: 10 }}>
            <IconButton sx={{ position: 'absolute', top: 64, left: 64, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            
            <Typography variant="h2" sx={{ textAlign: 'center', mt: 2 }} gutterBottom>
                View Courses
            </Typography>

            <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <Grid item="true" xs={12} md={8}>
                    <ButtonGroup variant="contained" aria-label="Basic button group" className={"button-group"}>
                        {subjects.length > 0 && subjects.map((subject) => ( 
                            <Button key={subject.name} className="parallelogram" variant={subject.name === selectedSubject ? "contained" : "outlined"} 
                            sx={{ cursor: 'pointer', position: 'relative', transform: 'skew(-20deg)', color: (subject.name === selectedSubject ? '#fdf800' : '#37EBF3'), border: 'none', padding: '15px 30px', fontSize: '16px',zIndex: 1 }} color="#fdf800"
                            onClick={() => handleSubjectClick(subject.name)}>
                                <Typography sx={{transform: 'skew(20deg)', width: '200px'}}>{subject.name}</Typography>
                            </Button>
                        ))}
                    </ButtonGroup>
                </Grid>
            </Grid> 

            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={4} sx={{ mt: 4 }}>
                { selectedCourses && selectedCourses.map((course, index) => (
                    <Grid key={index} item="true">
                        <Grid container alignItems="center" justifyContent="center" spacing={2}>
                            <Grid item="true">
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 300, height: 80, borderRadius: '90px', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 3 }}>
                                        <Typography variant="h6">{course.level}</Typography>
                                    </Box>
                                    <Box sx={{ width: 250, height: 80, backgroundColor: '#fdf800', position: 'relative', display: 'flex', alignItems: 'center' }}>
                                        <Chip label={`£${course.cost}`} variant="outlined" onClick={handleClick} />
                                        <Typography sx={{ fontSize: '14px', color: '#000' }}>
                                            {course.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        {index < selectedCourses.length - 1 && (
                            <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                                <ArrowDownwardIcon sx={{ color: 'white', fontSize: 32 }} />
                            </Grid>
                        )}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
