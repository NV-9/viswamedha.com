import Cookies from "universal-cookie";

export const API_URL = import.meta.env.VITE_API_URL;

export class ApiRouter {
    static request(method, path, data = {}, headers = {}) {
        const cookies = new Cookies();
        const token = cookies.get('csrftoken');
        const isFormData = data instanceof FormData;
        var options = {
            method: method,
            headers: {
                'accept': 'application/json',
                'X-CSRFToken': token,
                ...headers,
            },
        }
        if (isFormData) {
            options.body = data;
            delete options.headers['Content-Type'];
        } else if (method !== 'GET' && method !== 'HEAD') {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }
        path = API_URL + path;
        return new Promise((resolve, reject) => {
            fetch(path, options).then(result => result.headers.get("Content-Type")?.includes("application/json")? result.json(): null)
            .then(resolve)
            .catch(reject);
        })
    }

    static get(path) {
        return this.request('GET', path);
    }

    static post(path, data) {
        return this.request('POST', path, data);
    }

    static put(path, data) {
        return this.request('PUT', path, data);
    }

    static patch(path, data) {
        return this.request('PATCH', path, data);
    }

    static delete(path) {
        return this.request('DELETE', path);
    }

}