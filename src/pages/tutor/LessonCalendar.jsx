import React, { useState } from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import { Box, Grid2 as Grid, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


export default function LessonCalendar({ setDrawerOpen}) {
    const [events, setEvents] = useState([]);
    const weekSettings = { 
        weekDays: [0, 1, 2, 3, 4, 5, 6], 
        weekStartOn: 1, 
        startHour: 0, 
        endHour: 24,
        step: 60,
        navigation: true,
        disableGoToDay: false
    }
    const monthSettings = { 
        weekDays: [0, 1, 2, 3, 4, 5, 6], 
        weekStartOn: 1, 
        startHour: 0, 
        endHour: 24,
        step: 60,
        navigation: true,
        disableGoToDay: true
    }

   return (
        <Box sx={{ backgroundColor: 'rgba(5,10,14,1.00)', backgroundSize: 'cover', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 3, pl: 10, position: 'relative', color: 'white' }}>
            <IconButton sx={{ position: 'absolute', top: 64, left: 64, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h2" sx={{ alignSelf: 'center', textAlign: 'center', width: '100%', mt: 2 }} gutterBottom>
                Lesson Planner
            </Typography>
            <Grid container justifyContent="center" sx={{ width: '100%' }}>
                <Grid item="true" xs={12} sx={{ width: '100%' }}>
                    <Scheduler view="month" week={weekSettings} month={monthSettings} events={events} sx={{ width: '100%' }}/>
                </Grid>
            </Grid>
        </Box>
   );
}
