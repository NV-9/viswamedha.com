import { API_ENDPOINTS, mapping } from './Mapping';
import { ApiRouter } from './Api';
import { format, parseISO, isSameDay, isBefore } from 'date-fns';


export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    try {
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    } catch (error) {
        return '';
    }
};

export const getRootDomain = () => {
    const host = window.location.host;
    if (host.includes('localhost'))
        return 'localhost';
    return host.split('.').slice(-2).join('.');
};

export const getSubDomain = () => {
    const host = window.location.host;
    const parts = host.split('.');
    if (host.includes('localhost'))
        return (parts.length === 1) ? null : parts.slice(0, -1).join('.');
    return host.split('.').slice(0, -2).join('.');
}

export const routeToHomeIfNotLoggedIn = (navigate) => {
    ApiRouter.get(API_ENDPOINTS.SESSION())
    .then(data => {
        if (!data.isAuthenticated) {
            navigate(mapping['Home'].getPath());
        }
    });
}

export const routeToHomeIfNotAdmin = (navigate) => {
    ApiRouter.get(API_ENDPOINTS.SESSION())
    .then(data => {
        if (!data.isStaff) {
            navigate(mapping['Home'].getPath());
        }
    });
}

export const routeToLoginIfNotLoggedIn = (navigate) => {
    ApiRouter.get(API_ENDPOINTS.SESSION())
    .then(data => {
        if (!data.isAuthenticated) {
            navigate(mapping['Login'].getPath());
        }
    });
}

export function formatLessonDate(startString, endString) {
    const startDate = parseISO(startString);
    const endDate = parseISO(endString);

    if (isSameDay(startDate, endDate)) {
        return `${format(startDate, "MMMM d, yyyy")} at ${format(startDate, "h:mm a")} - ${format(endDate, "h:mm a")}`;
    } else {
        return `${format(startDate, "MMMM d, yyyy 'at' h:mm a")} - ${format(endDate, "MMMM d, yyyy 'at' h:mm a")}`;
    }
}

export const convertIsoToDateTime = (isoString) => {
    return parseISO(isoString);
}

export function isLessonCompleted(endDateString) {
    const endDate = parseISO(endDateString);
    const now = new Date(); 
    return isBefore(endDate, now);
}