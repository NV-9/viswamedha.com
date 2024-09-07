import Cookies from "universal-cookie";

export const getRequest = async (path, rethrow = true) => {
    const cookies = new Cookies();
    try {
        const response = await fetch(path, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'X-CSRFToken': cookies.get("csrftoken")
            },
        });
        if (!response.ok && rethrow) {
            throw new Error(`API GET Error: ${response.statusText}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
        return null; 
    }
};