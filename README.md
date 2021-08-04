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