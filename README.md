# Modelbox Browser SDK
此SDK用于简化 Modelbox 模型API的调用，仅需前端传入模型文件即可实现嵌入式的模型预览，支持 **OBJ/FBX/GLTF/STL/STEP/IGES**

**码云地址：**[https://gitee.com/wangerzi/modelbox-sdk](https://gitee.com/wangerzi/modelbox-sdk)

**Github地址：**[https://github.com/wangerzi/modelbox-sdk](https://github.com/wangerzi/modelbox-sdk)

**npm package：**[https://www.npmjs.com/package/modelbox-sdk](https://www.npmjs.com/package/modelbox-sdk)

**Demo地址：**[https://wangerzi.gitee.io/modelbox-sdk/examples/index.html](https://wangerzi.gitee.io/modelbox-sdk/examples/index.html)

![GIF](https://preview.mobox3d.com/modelbox-sdk/ScreenGIF.gif)

## 版本发布记录

> 注：请尽量使用最新版本的 SDK，避免隐性 BUG

| 版本   | 发布时间         | CDN地址                                                     | 备注                           |
| ------ | ---------------- | ------------------------------------------------------------ | ------------------------------ |
| v1.0.6 | 2020-11-11 23:44 | https://preview.mobox3d.com/modelbox-sdk/1.0.6/modelbox-sdk.js | 更新文档优化并npm包大小        |
| v1.0.5 | 2020-11-09 22:40 | https://preview.mobox3d.com/modelbox-sdk/1.0.5/modelbox-sdk.js | 全体接口https                  |
| v1.0.4 | 2020-11-09 13:39 | https://preview.mobox3d.com/modelbox-sdk/1.0.4/modelbox-sdk.js | 修复 config 为空的问题         |
| v1.0.3 | 2020-11-09 00:39 | https://preview.mobox3d.com/modelbox-sdk/1.0.3/modelbox-sdk.js | 最初版本，实现基本上传预览功能 |

### 已支持的能力

- **极简的 SDK 调用**，仅需要传入用户选择的文件即可嵌入3D模型展示
- 多种模型类型支持，包括 **OBJ/FBX/GLTF/STL/STEP/IGES**
- 支持 **模型压缩** ，数 Mb 的 STL 压缩到数百 Kb，更适合 Web 场景的跨平台展示
- 利用 **CDN 边缘节点** 的能力，加速对模型资源的上传和下载分发
- 支持 [3d场景编辑器](https://preview.mobox3d.com/index.html#/Manage/editor/EAAYIrBA)  中的全部能力，包括 **模型渲染、视角控制、环境HDR、光照、动画** 等

### 待实现的能力

- [ ] 【增强】场景编辑器 **配置导出**
- [ ] 【增强】支持修改已上传模型的 **场景配置**
- [ ] 【增强】支持模型视角切换、 **X/Y/Z剖面**
- [ ] 【增强】支持模型 **图片纹理压缩**
- [ ] 【增强】支持模型 **尺寸测量、体积、表面积测量**
- [ ] 【增强】支持场景编辑器中的 **模型变换、组合、相机配置** 等
- [ ] 【优化】场景中
- [ ] 【优化】 **模型加载** 等待、模型转换等待交互
- [ ] 【优化】 3D场景编辑器的 交互及体验
- [ ] 【优化】 **模型转换** 速度
- [ ] 【优化】 **模型转换结果缓存**   以优化整体转换速度

## 模型处理及渲染流程

大致流程如下所示，**前端仅需上传文件**，然后等待模型处理完成即可，后端会自动做 **压缩包解压**、**转换**、**模型压缩**、**上传分发** 等一系列工作

![GIF](https://preview.mobox3d.com/modelbox-sdk/3dmodel-flow.jpg)

## 使用交流&BUG反馈

请扫描群二维码或搜索群号 『 **555876154** 』加群

![GIF](https://preview.mobox3d.com/modelbox-sdk/GroupQRCode.jpg)

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

可通过 CDN 的方式引用： https://preview.mobox3d.com/modelbox-sdk/1.0.5/modelbox-sdk.js ，或者下载到本地，使用 script 的方式引用即可得到 `MODELBOX_SDK` 全局对象

```html
<script src="https://preview.mobox3d.com/modelbox-sdk/1.0.5/modelbox-sdk.js"></script>
```

### 初始化

这里的 token 仅供测试，并不保证稳定性，如有企业需求请联系 admin@wj2015.com

```shell
MODELBOX_SDK.updateToken('5c06b6b8a548d8911e3ccdbdc518fac6');
```

### 上传模型

> 注意：上传的文件不应该超过 100M

```js
MODELBOX_SDK.uploadModel(file, type, config, modelConfig, function() {}, function() {} );
```

| 参数名称    | 类型     | 备注                                                         |
| ----------- | -------- | ------------------------------------------------------------ |
| file        | File     | 上传的单个文件对象                                           |
| type        | string   | stl/stp/igs/fbx/obj/gltf，不同类型对应不同的可上传文件后缀   |
| config      | object   | .name: 模型名称，.comment: 模型备注（预留参数，用于展示）    |
| modelConfig | object   | 一些配置，能够完成 [3d场景编辑器](https://preview.mobox3d.com/index.html#/Manage/editor/EAAYIrBA) 上的所有效果配置，详情请参见[#可选配置参数](可选配置参数) |
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
// 使用 DOM API 获取到 file 对象
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
<iframe src="https://preview.mobox3d.com/index.html#/PreviewModel/EAAYIrBA" width="600" height="400"></iframe>
```

### 可选配置参数

在上传模型的接口有一个 `modelConfig` ，可以针对  [3d场景编辑器](https://preview.mobox3d.com/index.html#/Manage/editor/EAAYIrBA)  中的所有参数进行初始化（**实时编辑功能**正在骑马来的路上，**参数配置生成器**也在骑马来的路上）

可配置参数分为 **模型渲染、视角控制、环境HDR、光照、动画** 几个模块，分别对应如下几个大的配置参数

| 模块名称 | 对应配置key |
| -------- | ----------- |
| 模型渲染 | render      |
| 视角控制 | control     |
| 环境HDR  | environment |
| 光照     | lights      |
| 动画     | animate     |

所以整个`modelConfig`的配置结构大体如下：

```js
var modelConfig = {
    render: {...},
    control: {...},
    environment: {...},
    lights: {...},
    animate: {...},
};
// 然后作为参数传到 SDK 中
MODELBOX_SDK.uploadModel(file, type, config, modelConfig, function() {}, function() {} );
```

> ！！！ 注意：如下的配置可能有点复杂，在 **实时配置生成器实现之前想要达到指定的渲染效果会比较费时间** ，如有紧急或特殊需求还请先进群或者邮件我 ！！！

#### render - 模型渲染配置

此模块主要控制模型场景的整体渲染效果，比如**抗锯齿、色调映射、输出编码器**等，其 默认配置如下：

```js
var defaultRenderConfig = {
    // webgl 的配置
    glConfig: {
        antialias: true, // 抗锯齿
        alpha: true, // 是否包含透明缓冲区
        logarithmicDepthBuffer: true, // 是否启用深度缓冲区（可能导致性能下降）
        toneMapping: 0, // 色调映射，影响效果
        toneMappingExposure: 0.75, // 色调映射强度调整
    },
    // 外部的渲染配置
    outputEncoding: 3001,
    gammaFactor: 2,
};
```

#### control - 视角控制配置

此模块主要用于控制模型展示视角及初始配置参数，包括**自由视角、锁定视角**等，其默认配置如下：

```js
var defualtControlConfig = {
    type: CONTROL_TYPE_LOCK,
    TrackballControls: { // 自由视角
        dynamicDampingFactor: 0.12, // 阻尼强度
        panSpeed: 0.3, // 平移速度
        rotateSpeed: 1.5, // 旋转速度
        noPan: false, // 禁止平移
        noRotate: false, // 禁止旋转
        noZoom: false, // 禁止缩放
        zoomSpeed: 1.2, // 缩放速度
        maxDistance: 9999999, // 最大距离
        minDistance: 0, // 最小距离
    },
    OrbitControls: { // 锁定视角
        enabled: true, // 允许操作
        autoRotate: false, // 自动旋转
        autoRotateSpeed: 2.0, // 自动旋转速度
        enableDamping: true, // 允许阻尼运动
        dampingFactor: 0.2, // 阻尼运动参数，越小惯性越明显
        enablePan: true, // 允许平移
        enableRotate: true, // 允许旋转
        enableZoom: true, // 允许缩放
        maxDistance: 9999999, // 最大距离
        minDistance: 0, // 最小距离
        minPolarAngle: -Math.PI, // 最小可查看角度
        maxPolarAngle: Math.PI, // 最大可查看角度
        minAzimuthAngle: -2 * Math.PI, // 最小水平旋转角度
        maxAzimuthAngle: 2 * Math.PI, // 最大水平旋转角度
        maxZoom: 9999999, // 最大放多远
        minZoom: 0, // 最小放多远
        zoomSpeed: 1, // 缩放速率
    },
}
```

#### environment - 环境HDR

这个部分主要用于控制环境光照和模型背景，支持 **HDR、环绕图片、颜色背景**，其默认参数如下：

```js
var defaultEnvironmentConfig =  {
    type: 'background', // 类型
    background: '#dddddd', // 背景色配置
    hdr: '/static/resources/venice_sunset_1k.hdr', // 日落
    env: '/static/resources/textures/Park3Med/', // 雪地
    sky: {
        scalar: 450000,
        effectControl: {
            turbidity: 10,
            rayleigh: 2,
            mieCoefficient: 0.005,
            mieDirectionalG: 0.8,
            luminance: 1,
            inclination: 0.49, // elevation / inclination
            azimuth: 0.25, // Facing front,
            sun: true,
        },
    }
}
```

#### lights - 光照

这个模块的配置用于控制光照，支持**环境光、点光源、平行光、全局光**，以及未来会增加更多的可配置项，其默认参数如下：

> 注：如下参数的意思是，配置五个平行光，方向分别是 (1, 1, 1)，(-1, 1, 1)，(1, 1, -1)，(-1, 1, -1)，(0, -1, 0)，如果用点光源，type 设置为点光源('piont') 并且映射每个灯光中的 point  参数，环境光(hemisphere)，全局光照(ambient) 同理
>
> 如下 配置中的 intensity 均为光强的意思，一般从 0 ~ 1，数值越大光照强度越大。

```js
var defaultLightsConfig = {
    lights: [
        {
            type: 'directional',
            status: true,
            ambient: {
                color: '#ffffff',
                intensity: 1,
            },
            point: {
                color: '#ffffff',
                intensity: 1,
                distance: 0,
                decay: 2,
                position: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
            },
            directional: {
                color: '#ffffff',
                intensity: 1,
                position: {
                    x: 1,
                    y: 1,
                    z: 1,
                },
            },
            hemisphere: {
                skyColor: '#ffffff',
                groundColor: '#000000',
                intensity: 0.6,
            },
        },
        {
            type: 'directional',
            status: true,
            ambient: {
                color: '#ffffff',
                intensity: 1,
            },
            point: {
                color: '#ffffff',
                intensity: 1,
                distance: 0,
                decay: 2,
                position: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
            },
            directional: {
                color: '#ffffff',
                intensity: 1,
                position: {
                    x: -1,
                    y: 1,
                    z: 1,
                },
            },
            hemisphere: {
                skyColor: '#ffffff',
                groundColor: '#000000',
                intensity: 0.6,
            },
        },
        {
            type: 'directional',
            status: true,
            ambient: {
                color: '#ffffff',
                intensity: 1,
            },
            point: {
                color: '#ffffff',
                intensity: 1,
                distance: 0,
                decay: 2,
                position: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
            },
            directional: {
                color: '#ffffff',
                intensity: 1,
                position: {
                    x: 1,
                    y: 1,
                    z: -1,
                },
            },
            hemisphere: {
                skyColor: '#ffffff',
                groundColor: '#000000',
                intensity: 0.6,
            },
        },
        {
            type: 'directional',
            status: true,
            ambient: {
                color: '#ffffff',
                intensity: 1,
            },
            point: {
                color: '#ffffff',
                intensity: 1,
                distance: 0,
                decay: 2,
                position: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
            },
            directional: {
                color: '#ffffff',
                intensity: 1,
                position: {
                    x: -1,
                    y: 1,
                    z: -1,
                },
            },
            hemisphere: {
                skyColor: '#ffffff',
                groundColor: '#000000',
                intensity: 0.6,
            },
        },
        {
            type: 'directional',
            status: true,
            ambient: {
                color: '#ffffff',
                intensity: 1,
            },
            point: {
                color: '#ffffff',
                intensity: 1,
                distance: 0,
                decay: 2,
                position: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
            },
            directional: {
                color: '#ffffff',
                intensity: 1,
                position: {
                    x: 0,
                    y: -1,
                    z: 0,
                },
            },
            hemisphere: {
                skyColor: '#ffffff',
                groundColor: '#000000',
                intensity: 0.6,
            },
        },
    ],
}
```

#### animate - 动画

这个模块的配置用于**播放指定的、烘焙好的动画**，目前的 3D格式内，带有动画信息的格式为 FBX/GLTF，部分 FBX 由于会被转换为 GLTF，动画播放可能有异常，需与模型师多次沟通尝试，动画模块配置如下：

> 注：index 表示播放第几个动画

```js
var defaultAnimateConfig = {
    index: 0,
};
```

## LICENCE

MIT
