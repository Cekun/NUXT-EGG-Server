const BaseController = require('./base')
const md5 = require('md5')
const jwt = require('jsonwebtoken');

const createRule = {
  email: { type: 'email' },
  nickname: { type: 'string' },
  passwd: { type: 'string' },
  captcha: { type: 'string' }
}

const HashSalt = 'yck'

class UserController extends BaseController {

  async login() {
    const { ctx, app } = this;
    const { email, passwd, captcha, emailcode } = ctx.request.body
    if(captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) 
      return this.error('验证码错误！')
    if(emailcode.toUpperCase() !== ctx.session.emailcode.toUpperCase()) 
      return this.error('邮箱验证码错误！')
    const user = ctx.model.User.findOne({email, password: md5(passwd+HashSalt)})
    if(!user) 
      this.error('用户名或密码错误！')
    const token = jwt.sign({
      _id: user._id,
      email
    }, app.config.jwt.secret, { expiresIn: '1h' });
    this.success({token, email, nickname: user.nickname})
  }

  async register() {
    const { ctx } = this
    try {
      ctx.validate(createRule)
    } catch (error) {
      return this.error('参数校验失败', -1, error.errors)
    }
    const { email, passwd, captcha, nickname } = ctx.request.body

    if(captcha.toUpperCase() === ctx.session.captcha.toUpperCase()) {
      // 邮箱是否重复
      if(await this.checkEmail(email)) {
        this.error('该邮箱已注册')
      } else {
        const ret = await ctx.model.User.create({
          email,
          nickname,
          password: md5(passwd + HashSalt),
        })
        if(ret._id) {
          this.message('注册成功');
        }
      }
    } else {
      this.error('验证码错误！')
    }

    // this.success({ name: 'yck' })
  }
  async checkEmail(email) {
    const user = await this.ctx.model.User.findOne({email});
    return user;
  }

  async verify() {
    
  }

  async info() {
    const { ctx } = this;
    const { email } = ctx.state
    const user = await this.checkEmail(email)
    this.success(user)
  }

}

module.exports = UserController