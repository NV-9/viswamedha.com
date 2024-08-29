import { getRequest } from "./requests";

export const getSession = async () => {
    try {
        const data = await getRequest('/api/session/');
        return data.isAuthenticated;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const whoami = async () => {
    try {
        const data = await getRequest('/api/whoami/');
        console.log("You are logged in as: " + data.username);
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getUserId = async () => {
    try {
        const userData = await whoami(); // Get user data
        return userData.id; // Return user ID
    } catch (err) {
        console.log(err);
        throw err;
    }
};
