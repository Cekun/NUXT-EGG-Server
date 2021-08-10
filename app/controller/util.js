const svgCaptcha = require('svg-captcha');
const BaseController = require('./base');
const fse = require('fs-extra');
const path = require('path')
class UtilController extends BaseController {
  async captcha() {
    const captcha = svgCaptcha.create();
    const { ctx } = this;
    ctx.session.captcha = captcha.text;
    ctx.response.type = 'image/svg+xml'
    ctx.body = captcha.data
  }
  async sendCode() {
    const { ctx } = this;
    const email = ctx.query.email
    let code = Math.random().toString().slice(2, 6)
    console.log('email: ' + email+' code: '+ code);
    ctx.session.emailcode = code

    const subject = '登录验证码'
    const text = ''
    const html = `<h2>我的社区</h2><span>${code}</span>`

    const hasSend = await this.service.tools.sendMail(email, subject, text, html)
    if(hasSend)
      return this.message('发送成功！');
    else 
      return this.error('发送失败')
  }
  async uploadfile() {
    // public/hash/{hash+index}
    const { ctx } = this;
    const file = ctx.request.files[0]
    const { name, hash } = ctx.request.body

    const chunkPath = path.resolve(this.config.UPLOAD_DIR, hash)

    if(!fse.existsSync(chunkPath))
      await fse.mkdir(chunkPath)

    await fse.move(file.filepath, `${chunkPath}/${name}`)
    this.success('切片上传成功')
  }

  async mergefile() {
    const { ext, size, hash } = this.ctx.request.body
    const filePath = path.resolve(this.config.UPLOAD_DIR, `${hash}.${ext}`)
    await this.ctx.service.tools.mergeFile(filePath, hash, size)
    this.success({
      url: `/public/${filePath}`
    })
  }

  async checkfile() {
    const { ctx } = this
    const { ext, hash } = ctx.request.body
    const filePath = path.resolve(this.config.UPLOAD_DIR, `${hash}.${ext}`)

    let uploaded = false
    let uploadedList = []
    if(fse.existsSync(filePath)) {
      // 文件存在
      uploaded = true
    } else {
      uploadedList = await this.getUploadedList(path.resolve(this.config.UPLOAD_DIR, hash))
    }
    this.success({
      uploaded,
      uploadedList
    })
  }

  async getUploadedList(dirPath) {
    // 过滤掉隐藏文件
    return fse.existsSync(dirPath)
      ? (await fse.readdir(dirPath)).filter(name=>name[0]!=='.') 
      : []
  }

}

module.exports = UtilController;
