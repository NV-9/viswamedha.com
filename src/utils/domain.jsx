

export const getDomain = () => {
    const host = window.location.host;
    if (host.includes('localhost'))
        return 'localhost';
    const parts = host.split('.');
    switch (parts.length) {
        case 1: case 2: 
            return host;
        default: 
            return parts.slice(-2).join('.');
    }
}

export const getSubdomain = () => {
    const host = window.location.host;
    const parts = host.split('.');
    if (host.includes('localhost')) {
        return parts.slice(0, -1).join('.');
    }
	return parts.slice(0, -2).join('.') || null;
}



