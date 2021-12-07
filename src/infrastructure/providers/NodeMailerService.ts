import nodemailer from 'nodemailer';

interface IEmailModel {
  from: string,
  to: string,
  subject: string,
  text: string,
  html?: string,
}

const sender = nodemailer.createTransport({
  name: 'no-reply@falaagro.com',
  host: 'smtp.titan.email',
  service: 'smtp.titan.email',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_SENDER_PASSWORD
  }
});

const handleSendEmail = (emailModel: IEmailModel) => {
  sender.sendMail(emailModel, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.info(info);
    }
  });
}

export default handleSendEmail;
