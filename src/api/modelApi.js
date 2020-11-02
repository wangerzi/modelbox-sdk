import {API_URL, post, putObject} from "./requests"

let API_TOKEN = ''

function setToken(token) {
  API_TOKEN = token
}

async function createFile(config = {}) {
  config = Object.assign({
    is_public: 1,
    ext: '.zip'
  }, config)
  return new Promise((resolve, reject) => {
    post(API_URL + '/file/Index/create', config).then(res => {
      resolve(res.data);
    }).catch(res => {
      reject(res)
    })
  })
}


async function uploadComplete(id) {
  const config = {
    id,
  }
  return new Promise((resolve, reject) => {
    post(API_URL + '/file/Index/uploadComplete', config).then(res => {
      resolve(res.data);
    }).catch(res => {
      reject(res)
    })
  })
}
async function remainAccessTime() {
  return new Promise(((resolve, reject) => {
    post(API_URL + '/model/ModelApi/remainAccessTime', config).then(res => {
      resolve(res.data);
    }).catch(res => {
      reject(res)
    })
  }))
}

async function createModel(config) {
  return new Promise(((resolve, reject) => {
    post(API_URL + '/model/ModelApi/create', config).then(res => {
      resolve(res.data);
    }).catch(res => {
      reject(res)
    })
  }))
}

async function putFile(url, file) {
  return new Promise(((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = (e) => {
      putObject(url, e.target.result)
      resolve(true)
    }
    reader.onerror = () => {
      reject('Load file Error')
    }
  }))
}

export default {
  setToken,
  uploadComplete,
  createFile,
  remainAccessTime,
  createModel,
  putFile,
}
