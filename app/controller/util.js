const svgCaptcha = require('svg-captcha');

const Controller = require('egg').Controller;

class UtilController extends Controller {
  async captcha() {
    const captcha = svgCaptcha.create();
    console.log('captcha: ', captcha);
    const { ctx } = this;
    ctx.session.captcha = captcha.text;
    ctx.response.type = 'image/svg+xml'
    ctx.body = captcha.data
  }
}

module.exports = UtilController;
