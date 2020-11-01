import { API_URL, post } from "./requests";

let API_TOKEN = '';

function setToken(token) {
    API_TOKEN = token;
}

async function generateUploadFileUrl(config = {}) {
    config = Object.assign({
        is_public: 1,
        ext: '.zip'
    }, config)
    return new Promise((resolve, reject) => {
        post(API_URL + '/file/Index/create', config).then(res => {
            resolve(res.upload_url)
        }).catch(res => {
            reject(res)
        })
    });
}

export default {
    setToken,
    generateUploadFileUrl
};