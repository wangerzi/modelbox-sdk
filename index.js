import { stringify } from 'qs';
import api from './src/api/modelApi'

var MODELBOX_SDK = {}
let VERSION = '0.0.1';

function makeObject(object) {
    /**
     * uploda model by blob and config
     * @param Blob blob 
     * @param function success(url) {
     }
     * @param function error(msg) {
     }
     * @param Object config {ext: '.zip'}
     * @param Object modelConfig 
     */
    function uploadModel(blob, config = {}, modelConfig = {}, success = undefined, error = undefined) {
        config = Object.assign({
            'name': "Default Model Name",
            'type': "",
            'source_file_id': 0,
            'comment': "No Comment",
            'config': {},
            'ext': '.zip'
        }, config)
        api.generateUploadFileUrl({
            is_public: 1,
            ext: config.ext,
        }).then(url => {
            console.log('url:', url);
        }).catch(r => {
            if (error && error.apply) {
                error.apply(this, ['ModelBox Generate UploadFile Failed:' + r])
            }
        })
    }

    object.uploadModel = uploadModel;
    object.version = VERSION;

    return object;
}

if (typeof exports !== 'undefined') makeObject(exports);
else if (typeof module !== 'undefined' && module.exports) makeObject(module.exports);
else if (typeof define === 'function' && define.amd) define('modelbox', function() { if (!MODELBOX_SDK.version) makeObject(MODELBOX_SDK); return MODELBOX_SDK; });
else {
    makeObject(MODELBOX_SDK);
    window.MODELBOX_SDK = MODELBOX_SDK;
}