import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import timeGridPlugin from '@fullcalendar/timegrid';

export default function Calendar() {
    return (
        <FullCalendar
            height="100vh"
            plugins={[ dayGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin, timeGridPlugin ]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
            }}
            editable={true}
            events={[
                { title: 'event 1', date: '2024-08-30' },
                { title: 'event 2', date: '2024-08-29' }
            ]}
            eventClick={(info) => {
                info.jsEvent.preventDefault();
                
            }}        
        />
    )
}