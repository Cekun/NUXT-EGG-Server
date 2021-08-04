const { Service } = require('egg')
const nodemailer = require('nodemailer')

const userEmail = 'shengxinjing@126.com'
const transporter = nodemailer.createTransport({
  service: "126",
  secureConnection: true,
  auth: {
    user: userEmail,
    pass: '316783812'
  }
})

class ToolService extends Service {
  async sendMail(email, subject, text, html) {
    const mailOptions = {
      from: userEmail,
      cc: userEmail,
      to: email,
      subject,
      text,
      html
    }
    try {
      await transporter.sendMail(mailOptions)
      return true
    } catch (error) {
      console.log('email send error: ', error);
      return false
    }
  }
}

module.exports = ToolService