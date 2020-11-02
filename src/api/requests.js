import * as axios from 'axios';
import qs from 'qs';

export const API_URL = 'http://api.mobox3d.com';
export const PREVIEW_URL = 'http://preview.mobox3d.com';

export async function get(url) {
    return new Promise(((resolve, reject) => {
        axios.get(url).then((res) => {
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

export async function post(url, postData) {
    return new Promise(((resolve, reject) => {
        axios.post(url, qs.stringify(postData)).then((res) => {
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
