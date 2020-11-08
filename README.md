# Modelbox Browser SDK
此SDK用于简化 Modelbox 模型API的调用，码云地址：[https://gitee.com/wangerzi/modelbox-sdk](https://gitee.com/wangerzi/modelbox-sdk)，Github地址：[https://github.com/wangerzi/modelbox-sdk](https://github.com/wangerzi/modelbox-sdk)

Demo地址：[http://wangerzi.gitee.io/modelbox-sdk/examples/index.html](http://wangerzi.gitee.io/modelbox-sdk/examples/index.html)

![GIF](ScreenGIF.gif)

## 使用方法

#### 方式一：npm引入

```shell script
npm install modelbox-sdk
```

然后使用模块化的加载方式得到 SDK 对象

```js
import MODELBOX_SDK from 'modelbox-sdk'
```

#### 方式二：script标签引入

可通过 CDN 的方式引用：http://preview.mobox3d.com/modelbox-sdk/1.0.3/modelbox-sdk.js，或者下载到本地，使用 script 的方式引用即可得到 `MODELBOX_SDK` 全局对象

```html
<script src="http://preview.mobox3d.com/modelbox-sdk/1.0.3/modelbox-sdk.js"></script>
```

### 初始化

这里的 token 仅供测试，并不保证稳定性，如有企业需求请联系 admin@wj2015.com

```shell
MODELBOX_SDK.updateToken('5c06b6b8a548d8911e3ccdbdc518fac6');
```

### 上传模型

> 注意：上传的文件不应该超过 100M

| 参数名称    | 类型     | 备注                                                         |
| ----------- | -------- | ------------------------------------------------------------ |
| file        | File     | 上传的单个文件对象                                           |
| type        | string   | stl/stp/igs/fbx/obj/gltf，不同类型对应不同的可上传文件后缀   |
| config      | object   | .name: 模型名称，.comment: 模型备注（预留参数，用于展示）    |
| modelConfig | object   | 一些配置，能够完成[编辑器](http://preview.mobox3d.com/index.html#/Manage/editor/EAAYIrBA)上的所有效果配置，**整理中** |
| success     | callback | 调用成功触发此函数回调，处理成功后触发，第一个参数为响应的数据，包含嵌入式网页URL，编辑器URL，原始资源下载URL |
| error       | callback | 调用失败触发此函数回调，第一个参数为错误原因的字符串         |

上传模型支持文件类型如下表所示：

| 模型类型 | 支持类型        |
| -------- | --------------- |
| stl      | .stl/.zip       |
| stp      | .stp/.step/.zip |
| igs      | .igs/.iges/.zip |
| fbx      | .fbx/.zip       |
| obj      | .obj/.zip       |
| gltf     | .gltf/.glb/.zip |

示例代码如下：

```shell
// 使用 domapi 获取到 file 对象
var file = form.querySelector('input[type="file"]');
// 将选择的 File 对象传入到 SDK 中，比如这里使用了第一个文件，索引为 0
MODELBOX_SDK.uploadModel({
      file: file.files[0],
      type: 'stl',
      config: {
        'name': name,
        'comment': comment,
      },
      modelConfig: config,
      success: function (res) {
        layui.layer.close(layerIndex);
        // res.iframe_url 表示嵌入网页的 url
        // res.editor_url 表示编辑器网页 url
        // res.source_file_url 表示源资源的下载 url
        console.log(res);
      },
      error: function (msg) {
       console.error(msg); // 错误信息
      },
    });
```

### 查看模型

在上传的时候，保存好嵌入网页的url（参数：`res.iframe_url`）即可，使用 iframe 标签进行页面嵌入

```html
<iframe src="http://preview.mobox3d.com/index.html#/PreviewModel/EAAYIrBA" width="600" height="400"></iframe>
```

## LICENCE
MIT
