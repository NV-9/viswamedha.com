import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { MenuIcon } from '../../icon/MenuIcon';
import { Alert, Box, Button, Card,  CardContent, Chip, Grid2 as Grid, IconButton, Snackbar, Typography} from '@mui/material';
import { TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

import { routeToLoginIfNotLoggedIn, getFormattedDurationBetween, isLessonCompleted } from '../../utils/Helpers';
import { API_ENDPOINTS } from '../../utils/Endpoints';
import { mapping } from '../../utils/Mapping';
import { ApiRouter } from '../../utils/Api';

const ColorScheme = {
    'color': 'white',
    '& input': { 
        color: 'white',
        WebkitTextFillColor: 'white',
    },
    '& textarea': { 
        color: 'white', 
        WebkitTextFillColor: 'white',
    },
    '& .MuiOutlinedInput-notchedOutline': { 
        borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': { 
        borderColor: 'white' 
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
        borderColor: '#37EBF3' 
    },
    '& .MuiSvgIcon-root': { 
        color: 'white',
    },
    '& .MuiInputLabel-root': { 
        color: 'white',
    },
    '& .Mui-disabled': { 
        'color': 'white !important',
        '& input': { 
            color: 'white !important',
            WebkitTextFillColor: 'white !important',
        },
        '& .MuiOutlinedInput-notchedOutline': { 
            borderColor: 'white !important',
        },
        '& .MuiSvgIcon-root': { 
            color: 'white !important',
        },
    },
};

export default function Lesson({ setDrawerOpen }) {
    const { uuid } = useParams();
    const navigate = useNavigate();
    const [isStaff, setIsStaff] = useState(false);
    const [open, setOpen] = useState(false);
    const [notifMessage, setNotifMessage] = useState('');
    const [lesson, setLesson] = useState(null);
    const [lessonStart, setLessonStart] = useState(new Date());
    const [lessonEnd, setLessonEnd] = useState(new Date());
    const [lessonPaid, setLessonPaid] = useState(false);
    const [lessonCost, setLessonCost] = useState(0);
    const [lessonNote, setLessonNote] = useState('');
    const [lessonHomework, setLessonHomework] = useState('');
    const [lessonFiles, setLessonFiles] = useState([]);
    const [students, setStudents] = useState([]);
    const [currentStudentUUID, setCurrentStudentUUID] = useState();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    useEffect(() => {
        if (students.length === 0) return;
        ApiRouter.get(API_ENDPOINTS.ME())
        .then((userData) => {
            if (!userData.success) navigate(mapping['Home'].getPath());
            setCurrentStudentUUID(userData.student_uuid);
        });
    }, [isStaff, students]);

    useEffect(() => {
        routeToLoginIfNotLoggedIn(navigate);
        ApiRouter.get(API_ENDPOINTS.SESSION())
        .then((data) => {
            if (data.detail)
                navigate(mapping['Login'].getPath());
            setIsStaff(data.isStaff);
        });
    }, []);

    useEffect(() => {
        ApiRouter.get(API_ENDPOINTS.LESSON(uuid))
        .then((data) => {
            if (data.detail)
                navigate(mapping['Students'].getPath());
            setLesson(data); 
            setStudents(data.students);
            setLessonStart(new Date(data.start));
            setLessonEnd(new Date(data.end));
            setLessonPaid(data.paid);
            setLessonCost(data.cost);
            setLessonNote(data.note);
            setLessonHomework(data.homework);
            setLessonFiles(data.lesson_file);
        })
        .catch(() => navigate(mapping['Students'].getPath()));
    }, []);

    const submitLessonEventData = () => {
        if (lessonEnd < lessonStart) {
            alert("The end date/time cannot be before the start date/time!");
            return;
        }

        if (!isStaff) {
            alert("You do not have permission to update this lesson event!");
            return;
        }

        var lessonData = lesson;
        lessonData.start = lessonStart.toISOString();
        lessonData.end = lessonEnd.toISOString();

        ApiRouter.put(API_ENDPOINTS.LESSON(lesson.lesson_uuid), lessonData)
        .then((lesson) => {
            setNotifMessage("Lesson event updated successfully!");
            setOpen(true);
            setLesson(lesson);
        });
    };

    const submitLessonData = () => {
        if (lessonEnd < lessonStart) {
            alert("The end date/time cannot be before the start date/time!");
            return;
        }

        var lessonData = lesson;
        lessonData.cost = isStaff ? lessonCost : lessonData.cost;
        lessonData.paid = isStaff ? lessonPaid : lessonData.paid;
        lessonData.note = lessonNote;
        lessonData.homework = isStaff ? lessonHomework : lessonData.homework;
        ApiRouter.patch(API_ENDPOINTS.LESSON(uuid), lessonData)
        .then(() => {
            setNotifMessage("Lesson updated successfully!");
            setOpen(true);
        })
    };

    const handleAddNewFile = (event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            const maxSizeInMB = 10;
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
            if (newFile.size > maxSizeInBytes) {
                alert(`File size exceeds the limit of ${maxSizeInMB} MB. Please upload a smaller file.`);
                return;
            }
            const formData = new FormData();
            formData.append("file", newFile);
            formData.append("lesson", uuid);
            ApiRouter.post(API_ENDPOINTS.LESSON_FILE(), formData)
            .then((data) => {
                if (!data.id) {
                    alert("Error uploading file!");
                    return;
                }
                setLessonFiles([...lessonFiles, data]);
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
                alert("Error uploading file!");
            });     
        }
    };  

    const handleDeleteFile = (file_uuid) => {
        ApiRouter.delete(API_ENDPOINTS.LESSON_FILE_DELETE(file_uuid));
        const updatedFiles = lessonFiles.filter(file => file.file_uuid !== file_uuid);
        setLessonFiles(updatedFiles);
    };

    return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: 'white', p: 2, px: {sx: 2, md: 10} }}>
            <IconButton sx={{ position: 'absolute', top: { xs: 16, md: 64 }, left: { xs: 16, md: 64 }, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h2" sx={{ textAlign: 'center', mt: 2 }} gutterBottom>
                Lesson
            </Typography>
            {lesson  && lessonStart && lessonEnd && (
                <>
                    <Grid item xs={12}>
                        <Card sx={{ backgroundColor: 'rgba(20, 25, 30, 1.00)', color: 'white', display: 'flex', flexDirection: 'column', p: 2 }}>
                            <CardContent>
                                <Typography variant="h4" sx={{ textAlign: 'center', mt: 2 }} gutterBottom>Event Details</Typography>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
                                    <DateTimePicker label="Start" value={lessonStart} onChange={setLessonStart} sx={ColorScheme} disabled={!isStaff}/>
                                    <DateTimePicker label="End" value={lessonEnd} onChange={setLessonEnd} sx={ColorScheme} disabled={!isStaff}/>
                                    <Chip label={getFormattedDurationBetween(lessonStart.toISOString(), lessonEnd.toISOString())} color="success" />
                                    <Chip label={lesson.paid ? "Paid" : "Unpaid"} color={lesson.paid ? "success" : "primary"} />
                                    <Chip label={isLessonCompleted(lessonEnd.toISOString()) ? "Completed" : "Upcoming"} color={isLessonCompleted(lessonEnd.toISOString()) ? "success" : "primary"}/>
                                </Box>
                                {isStaff && (
                                    <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={submitLessonEventData}>Save</Button>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card sx={{ backgroundColor: 'rgba(20, 25, 30, 1.00)', color: 'white', display: 'flex', flexDirection: 'column', p: 2 }}>
                            <CardContent>
                                <Typography variant="h4" sx={{ textAlign: 'center' }} gutterBottom>Students in Lesson</Typography>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
                                    {students && students.map((student, index) => (
                                        <Chip key={student.student_uuid} label={student.username} color="primary" onClick={() => isStaff ? navigate(mapping['Student'].getPath(student.student_uuid)) : '#'}/>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card sx={{ backgroundColor: 'rgba(20, 25, 30, 1.00)', color: 'white', display: 'flex', flexDirection: 'column', p: 2 }}>
                            <CardContent>
                                <Typography variant="h4" sx={{ textAlign: 'center' }} gutterBottom>Lesson Details</Typography>
                                <Typography variant="h6" sx={{ mb: 1 }}>Lesson Cost</Typography>
                                <TextField type="number" fullWidth value={lessonCost} onChange={(e) => setLessonCost(e.target.value)} placeholder="Enter the lesson cost" variant="outlined" disabled={!isStaff}
                                    sx={{ backgroundColor: 'rgba(30, 35, 40, 1.00)', color: 'white', borderRadius: 1, ...ColorScheme}}
                                />
                                <Typography variant="h6" sx={{ mb: 1 }}>Lesson Paid</Typography>
                                {lessonPaid ? (
                                    <Typography variant="h6" sx={{ color: 'success.main', mb: 1 }}>This lesson is already paid.</Typography>
                                ) : (
                                    <>
                                    {isStaff ? (
                                        <Button variant="contained" color="secondary" onClick={() => setLessonPaid(true)} sx={{ mb: 1}}>
                                            Has this lesson been paid?
                                        </Button>
                                    ): (
                                        <Typography variant="h6" sx={{ color: 'error.main', mb: 1 }}>This lesson is not yet paid for.</Typography>
                                    )}
                                    </>
                                )}
                                <Typography variant="h6" sx={{ mb: 1 }}>Lesson Note</Typography>
                                <TextField 
                                    multiline rows={4} fullWidth value={lessonNote} 
                                    onChange={(e) => setLessonNote(e.target.value)}
                                    placeholder="Add a note here" 
                                    variant="outlined"
                                    sx={{ backgroundColor: 'rgba(30, 35, 40, 1.00)', color: 'white', borderRadius: 1, ...ColorScheme}}
                                />
                                <Typography variant="h6" sx={{ mb: 1 }}>Homework</Typography>
                                <TextField 
                                    multiline rows={4} fullWidth value={lessonHomework} 
                                    onChange={(e) => setLessonHomework(e.target.value)}
                                    placeholder="Homework details..." 
                                    variant="outlined" 
                                    sx={{ backgroundColor: 'rgba(30, 35, 40, 1.00)', color: 'white', borderRadius: 1, ...ColorScheme}}
                                    disabled={!isStaff}
                                />
                                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={submitLessonData}>Save</Button>   
                            </CardContent>
                        </Card>
                    </Grid>                
                    <Grid item xs={12}>
                        <Card sx={{ backgroundColor: 'rgba(20, 25, 30, 1.00)', color: 'white', display: 'flex', flexDirection: 'column', p: 2 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Lesson Files
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>                                
                                    {lessonFiles && lessonFiles.map((file, index) => (
                                        <Box key={file.file_uuid} sx={{ display: 'flex', alignItems: 'center', mb: 2, backgroundColor: 'rgba(30, 35, 40, 1.00)', borderRadius: 1, p: 1 }}>
                                            <Typography sx={{ flexGrow: 1, color: 'white', wordBreak: 'break-word' }}>{file.name}</Typography>
                                            <Button variant="contained" color="primary" sx={{ mr: 1 }}
                                                onClick={() => {
                                                    const link = document.createElement('a');
                                                    link.href = file.file;
                                                    link.download = file.name || 'download';
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link); 
                                                }}>Download</Button>
                                                <Button variant="outlined" color="error" onClick={() => handleDeleteFile(file.file_uuid)}>Delete</Button>
                                        </Box>
                                    ))}
                                    <TextField type="file" fullWidth variant="outlined" onChange={handleAddNewFile} sx={{ backgroundColor: 'rgba(30, 35, 40, 1.00)', color: 'white', borderRadius: 1, ...ColorScheme}} label="Add New File"/>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        { isStaff ? 
                            <>
                                {students && students.map((student, index) => 
                                    <Button size="small" color="primary" key={student.student_uuid} onClick={() => navigate(mapping['Student'].getPath(student.student_uuid))}>{student.username}</Button>
                                )}
                            </>: 
                            <Button size="small" color="primary" onClick={() => navigate(mapping['Student'].getPath(currentStudentUUID))}>Back</Button> 
                        }
                    </Grid>
                </>
            )}
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    {notifMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
