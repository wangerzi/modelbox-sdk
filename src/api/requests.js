import * as axios from 'axios';
import qs from 'qs';

export const API_URL = 'http://api.mobox3d.com';
// export const API_URL = 'http://localhost:8088';
let API_TOKEN = ''

export function setToken(token) {
    API_TOKEN = token
}
export async function get(url, option = {}) {
    return new Promise(((resolve, reject) => {
        option = Object.assign(option, {
            headers: {
                "X-api-key": API_TOKEN
            }
        })
        axios.get(url, option).then((res) => {
            const data = res.data;
            if (data.code !== 200) {
                reject(data.message);
            } else {
                resolve(data);
            }
        }).catch((e) => {
            reject(e);
        });
    }));
}

export async function post(url, postData, option = {}) {
    return new Promise(((resolve, reject) => {
        option = Object.assign(option, {
            headers: {
                "X-api-key": API_TOKEN
            }
        })
        // automatic json post
        axios.post(url, postData, option).then((res) => {
            const data = res.data;
            if (data.code !== 200) {
                reject(data.message, data);
            } else {
                resolve(data);
            }
        }).catch((e, r) => {
            reject(e, r);
        });
    }));
}

export async function putObject(url, body) {
    axios.put(url, body, {
        headers: {
            'Content-Type': '',
        }
    })
}
