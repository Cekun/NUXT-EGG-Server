const svgCaptcha = require('svg-captcha');
const BaseController = require('./base')

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
    console.log('email: '+email+' code: '+ code);
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
}

module.exports = UtilController;
