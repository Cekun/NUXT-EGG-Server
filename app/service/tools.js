const { Service } = require('egg')
const nodemailer = require('nodemailer')
const path = require('path')
const fse = require('fs-extra')

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
  async mergeFile(filePath, filehash, size) {
    const chunkDir = path.resolve(this.config.UPLOAD_DIR, filehash) //切片的文件夹
    let chunks = await fse.readdir(chunkDir)
    chunks.sort((a ,b) => a.split('-')[1] - b.split('-')[1])
    chunks = chunks.map(cp => path.resolve(chunkDir, cp))
    await this.mergeChunks(chunks, filePath, size)
  }
  async mergeChunks(files, dest, size) {

    const pipStream = (filePath, writeStream) => new Promise(resolve => {
      const readStream = fse.createReadStream(filePath)
      readStream.on('end', () => {
        fse.unlinkSync(filePath)
        resolve()
      })
      readStream.pipe(writeStream)
    })

    await Promise.all(
      files.map((file, index) => {
        pipStream(file, fse.createWriteStream(dest, {
          start: index*size,
          end: (index+1)*size
        }))
      })
    )
  }
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