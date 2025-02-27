import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { debounce } from 'lodash';

import { routeToLoginIfNotLoggedIn } from '../../utils/Helpers';
import { MenuIcon } from '../../icon/MenuIcon';
import { mapping } from '../../utils/Mapping';
import { ApiRouter } from '../../utils/Api';
import { API_ENDPOINTS } from '../../utils/Endpoints';

export default function LessonCalendar({ setDrawerOpen }) {
    const [isStaff, setIsStaff] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [clashingLessons, setClashingLessons] = useState([]);
    const navigate = useNavigate();
    const calendarRef = useRef(null);

    useEffect(() => {
        routeToLoginIfNotLoggedIn(navigate);
        ApiRouter.get(API_ENDPOINTS.SESSION())
            .then((data) => {
                if (data.detail) navigate(mapping['Login'].getPath());
                setIsStaff(data.isStaff);
            });
    }, [navigate]);

    useEffect(() => {
        if (isStaff !== null) {
            const { activeStart, activeEnd } = calendarRef.current?.getApi()?.view || {};
            if (activeStart && activeEnd) {
                fetchLessons(activeStart, activeEnd);
            }
        }
    }, [isStaff]);

    const fetchLessons = debounce((start, end) => {
        if (isStaff === false) {
            ApiRouter.get(API_ENDPOINTS.LESSONS(start.toISOString(), end.toISOString())).then((data) => {
                const primaryLessons = data.map(mapLessonToEvent);
                setLessons((prev) => {
                    const filteredPrev = prev.filter(
                        (lesson) => !primaryLessons.some((pl) => pl.lesson_uuid === lesson.lesson_uuid)
                    );
                    return [...filteredPrev, ...primaryLessons];
                });
            })
            .catch((err) => console.error('Error fetching primary lessons:', err));

            ApiRouter.get(
                `${API_ENDPOINTS.OTHER_LESSONS()}?start_range=${start.toISOString()}&end_range=${end.toISOString()}`
            ).then((data) => {
                if (data.success) {
                    const otherLessons = data.lessons;
                    setLessons((prev) => {
                        const filteredPrev = prev.filter(
                            (lesson) => !otherLessons.some((ol) => ol.lesson_uuid === lesson.lesson_uuid)
                        );
                        return [...filteredPrev, ...otherLessons];
                    });
                }
            }).catch((err) => console.error('Error fetching other lessons:', err));
        } else if (isStaff === true) {
            ApiRouter.get(API_ENDPOINTS.LESSONS(start.toISOString(), end.toISOString())).then((data) => {
                setLessons(data.map(mapLessonToEvent));
            });
        }
    }, 300);

    useEffect(() => {
        const clashingLessons = lessons.filter(lesson => lesson.clashing);
        setClashingLessons(clashingLessons);
    }, [lessons]);

    const mapLessonToEvent = (lesson) => ({
        title: lesson.students.map((entry) => entry.username).join(','),
        start: lesson.start,
        end: lesson.end,
        allDay: false,
        lesson_uuid: lesson.lesson_uuid,
        clashing: lesson.clashing,
        paid: lesson.paid,
    });

    const datesSet = (info) => {
        const { start, end } = info;
        fetchLessons(start, end);
    };

    const eventChange = (changeInfo) => {
        const updatedEvent = changeInfo.event;
        const uuid = updatedEvent.extendedProps.lesson_uuid;
        ApiRouter.put(API_ENDPOINTS.LESSON(uuid), {
            start: updatedEvent.start,
            end: updatedEvent.end,
        }).then(() => {
            setLessons((prev) => {
                return prev.map((lesson) =>
                    lesson.lesson_uuid === uuid
                        ? { ...lesson, start: updatedEvent.start, end: updatedEvent.end }
                        : lesson
                );
            });
        }).catch((err) => console.error('Failed to update event', err));
    };

    const eventContent = (eventInfo) => {
        const startTime = new Date(eventInfo.event.start).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
        const endTime = new Date(eventInfo.event.end).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
        return (
            <div>
                <div className="fc-event-dot" style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: (eventInfo.event.extendedProps.paid ? 'green' : 'red'), borderRadius: '50%', marginRight: '4px' }}/>
                <strong>{`${startTime} - ${endTime}`}</strong>
                <br />
                <span>{eventInfo.event.title}</span>
            </div>
        );
    };

    const isClashing = (newEvent) => {
        
        const overlappingEvent = clashingLessons.find((lesson) => {
            const existingEventStart = new Date(lesson.start);
            const existingEventEnd = new Date(lesson.end);
            const newEventStart = new Date(newEvent.start);
            const newEventEnd = new Date(newEvent.end);

            if (lesson.lesson_uuid === newEvent.extendedProps.lesson_uuid) {
                return false; 
            }

            return (
                (newEventStart >= existingEventStart && newEventStart < existingEventEnd) ||
                (newEventEnd > existingEventStart && newEventEnd <= existingEventEnd) ||
                (newEventStart <= existingEventStart && newEventEnd >= existingEventEnd)
            );
        });

        return overlappingEvent !== undefined;
    };

    const eventDrop = (info) => {
        const updatedEvent = info.event;
        if (isClashing(updatedEvent)) {
            alert('This event cannot be moved because it clashes with another event.');
            updatedEvent.setDates(info.oldEvent.start, info.oldEvent.end);
        }  else {
            setLessons((prevLessons) => {
                return prevLessons.map((lesson) =>
                    lesson.lesson_uuid === updatedEvent.extendedProps.lesson_uuid
                        ? { ...lesson, start: updatedEvent.start, end: updatedEvent.end }
                        : lesson
                );
            });
        }
    };

    const eventClick = (info) => {
        const event = info.event;
        const lessonUuid = event.extendedProps.lesson_uuid;
        const lessonTitle = event.title;
        if (lessonTitle !== 'Slot Taken')
            navigate(mapping['Lesson'].getPath(lessonUuid));
    };

    return (
        <Box
            sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(5,10,14,1.00)', color: 'white', p: 2, px: { xs: 2, sm: 2, md: 6, lg: 6 } }}>
            <IconButton sx={{ position: 'absolute', top: { xs: 16, md: 64 }, left: { xs: 16, md: 64 }, color: 'white' }} onClick={setDrawerOpen}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h2" sx={{ textAlign: 'center', mt: 2, mb: 4 }} gutterBottom>
                Lesson Planner
            </Typography>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                events={lessons}
                editable={isStaff}
                selectable={true}
                datesSet={datesSet}
                eventDrop={eventDrop}
                eventChange={eventChange}
                eventContent={eventContent}
                eventClick={eventClick}
                height="100%"
                contentHeight="auto"
                expandRows={true}
            />
        </Box>
    );
}
