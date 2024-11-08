
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