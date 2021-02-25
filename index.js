import api from './src/api/modelApi'

let MODELBOX_SDK = {}
let VERSION = '0.0.1'
const TYPE_FILE_MAP = {
  'stp': ['.stp', '.step', '.zip'],
  'iges': ['.igs', '.iges', '.zip'],
  'stl': ['.stl', '.zip'],
  'obj': ['.obj', '.zip'],
  'fbx': ['.fbx', '.zip'],
  'gltf': ['.gltf', '.glb', '.zip'],
}

function makeObject(object) {
  /**
   * uploda model by File Object and config
   * @param opt Object {
   *   file,
   *   type,
   *   config,
   *   modelConfig,
   *   success,
   *   error
   * }
   */
  function uploadModel(opt = {}) {
    let file = opt.file;
    let type = opt.type;
    let config = opt.config;
    let modelConfig = opt.modelConfig;
    let success = opt.success;
    let error = opt.error;
    // 1. check file
    if (!file || !file instanceof File) {
      if (error && error.apply) {
        error.apply(this, ['file params need File'])
      }
      return false;
    }
    // 1.1 limit 100Mb
    if (file.size / 1024 / 1024 > 100) {
      if (error && error.apply) {
        error.apply(this, ['File size limit at 100Mb'])
      }
      return false;
    }

    // 2. check file ext
    const fileName = file.name;
    const splitName = fileName.split('.');
    if (!splitName || !splitName.length) {
      if (error && error.apply) {
        error.apply(this, ['File ext not found'])
      }
      return false;
    }
    const ext = '.' + splitName[splitName.length - 1];
    if (!TYPE_FILE_MAP[type] || !TYPE_FILE_MAP[type].includes(ext.toLowerCase())) {
      if (error && error.apply) {
        error.apply(this, ['Model ' + type + ' only support ' + TYPE_FILE_MAP[type].join(',')])
      }
      return false;
    }

    config = Object.assign({
      'name': "Default Model Name",
      'comment': "No Comment",
    }, config);
    config['type'] = type;
    config['config'] = modelConfig;
    api.createFile({
      is_public: 1,
      ext: ext,
    }).then(data => {
      if (!data || !data.upload_url) {
        if (error && error.apply) {
          error.apply(this, ['Generate upload url failed:' + res])
        }
      }
      const url = data.upload_url;
      const fileId = data.id;
      // 1. upload file
      api.putFile(url, file).then(() => {
        // 2. handle upload file callback
        // 2. save model config
        config['source_file_id'] = fileId;
        api.createModel(config).then(d => {
          if (success && success.apply) {
            success.apply(this, [d])
          }
        }).catch(res => {
          if (error && error.apply) {
            error.apply(this, ['create model failed:' + res])
          }
          return false;
        });

        // em... oss can't notify automatic now
        // setTimeout(() => {
        //   api.uploadComplete(fileId).catch((res) => {
        //     if (error && error.apply) {
        //       error.apply(this, ['Complete upload url failed:' + res])
        //     }
        //   });
        // }, 3000);
      });
    }).catch(res => {
      if (error && error.apply) {
        error.apply(this, ['Generate upload url failed:' + res])
      }
      return false;
    });
  }

  object.remainAccessTime = api.remainAccessTime;
  object.updateToken = api.updateToken;
  object.uploadModel = uploadModel
  object.version = VERSION

  return object
}

if (typeof exports !== 'undefined') makeObject(exports)
else if (typeof module !== 'undefined' && module.exports) makeObject(module.exports)
else if (typeof define === 'function' && define.amd) define('modelbox', function () {
  if (!MODELBOX_SDK.version) makeObject(MODELBOX_SDK)
  return MODELBOX_SDK
})
else {
  makeObject(MODELBOX_SDK)
  window.MODELBOX_SDK = MODELBOX_SDK
}
