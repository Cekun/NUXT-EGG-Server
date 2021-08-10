# server



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org



`npm install egg-router-group egg-mongoose egg-validate --save`

`npm i md5 jsonwebtoken --save`

### 定制规范
**controller/base.js**

### 配置插件
congfig/plugin

> 会做csrf验证，开发先关掉  
> config/config.default.js  

```
return {
  ...,
  security: {
    csrf: {
      enable: false
    }
  },
  mongoose: {
    client: {
      url: "mongodb://127.0.0.1:27017/ckhub",
      options: {}
    }
  }
}
```

* 用户名密码验证
  1. 简单的邮箱验证码   
    > npm i nodemailer --save
  2. token的管理 => 用户中心页面，发送请求，自动带上token
   
* 用户信息  
  1. 信息的增删改查
  2. 头像的上传

## 文件上传
* config/config.default.js  

``` javacript
const path = require('path')

config.multipart = {
  mode: 'file',
  whitelist: ()=>true
}
config.UPLOAD_DIR = path.resolve(__dirname, '..', 'app/public')
```

* 安装文件管理的包
> npm i fs-extra --save

* 拖拽 + 进度条 .vue
  1. 拖拽上传监听dragover、dragleave、drop事件，e.dataTransfer获取拖拽的文件
  2. 在项目中经常遇到上传文件，这时又需要查看上传的进度，就可以用到axios进度条事件；onUploadProgress;  
  </br> 
   
* web-worker计算md5值 .vue  
  Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

  Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。
  > npm i spark-md5 --save

  1. 将front/node_modules/spark-md5.min.js文件复制到~/static文件夹下，并新建hash.js文件
