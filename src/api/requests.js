import {get as axiosGet, post as axiosPost, put as axiosPut} from 'axios';

export const API_URL = 'https://api.mobox3d.com';
// export const API_URL = 'http://localhost:8088';
let API_TOKEN = ''

export function setToken(token) {
    API_TOKEN = token
}
export function get(url, option = {}) {
    return new Promise(((resolve, reject) => {
        option = Object.assign(option, {
            headers: {
                "X-api-key": API_TOKEN
            }
        })
        axiosGet(url, option).then((res) => {
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

export function post(url, postData, option = {}) {
    return new Promise(((resolve, reject) => {
        option = Object.assign(option, {
            headers: {
                "X-api-key": API_TOKEN
            }
        })
        // automatic json post
        axiosPost(url, postData, option).then((res) => {
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
    return axiosPut(url, body, {
        headers: {
            'Content-Type': '',
        }
    })
}
