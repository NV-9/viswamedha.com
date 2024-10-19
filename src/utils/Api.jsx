import Cookies from "universal-cookie";

export const SITE_URL = import.meta.env.VITE_SITE_URL;

export class ApiRouter {
    static request(method, path, data = {}) {
        const cookies = new Cookies();
        const token = cookies.get('csrftoken');
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'X-CSRFToken': token,
            },
        }
        if (method !== 'GET' && method !== 'HEAD') {
            options.body = JSON.stringify(data);
        }
        path = SITE_URL + path;
        return new Promise((resolve, reject) => {
            fetch(path, options).then(result => result.json())
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

    static delete(path) {
        return this.request('DELETE', path);
    }

}