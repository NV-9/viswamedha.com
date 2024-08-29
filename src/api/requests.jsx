import Cookies from "universal-cookie";

export const getRequest = async (path) => {
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

        if (!response.ok) {
            throw new Error(`API GET Error: ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
        return null; 
    }
};


export const postRequest = async (path, data) => {
    const cookies = new Cookies();
    const jsonData = JSON.stringify(data);
    try {
        const response = await fetch(path, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'X-CSRFToken': cookies.get("csrftoken")
            },
            body: jsonData
        });
        const responseData = await response.json();
        responseData["status"] = response.status;
        return responseData;
    } catch (error) {
        console.error('API POST Error: ', error);
    }
};

export const putRequest = async (path, data) => {
    const cookies = new Cookies();
    const jsonData = JSON.stringify(data);
    try {
        const response = await fetch(path, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'X-CSRFToken': cookies.get("csrftoken")
            },
            body: jsonData
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('API PUT Error: ', error);
    }
};

export const patchRequest = async (path, data) => {
    const cookies = new Cookies();
    const jsonData = JSON.stringify(data);
    try {
        const response = await fetch(path, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'X-CSRFToken': cookies.get("csrftoken")
            },
            body: jsonData
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('API PATCH Error: ', error);
    }
};

export const deleteRequest = async (path) => {
    const cookies = new Cookies();
    try {
        const response = await fetch(path, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'X-CSRFToken': cookies.get("csrftoken")
            },
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('API DELETE Error: ', error);
    }
};
