const nodemailer = require("nodemailer");
const ejs = require("ejs");
const { htmlToText } = require("html-to-text");

module.exports = class Email {
  constructor(user, result) {
    this.to = user.email;
    this.from = "Exam Portal <examportal21@gmail.com>";
    this.name = user.firstName;
    this.result = result;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  }

  async send(template) {
    const html = await Promise.resolve(
      ejs.renderFile(`${__dirname}/../views/emails/${template}.ejs`, {
        firstName: this.name,
        result: this.result,
      })
    );
    //2.) create mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: this.result,
      html: html,
      text: htmlToText(html),
    };
    //3.) create transport and send mail
    await this.newTransport().sendMail(mailOptions);

  }
};
