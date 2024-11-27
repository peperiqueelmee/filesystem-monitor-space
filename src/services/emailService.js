const nodemailer = require('nodemailer');
const { config } = require('../config/config');
const { log } = require('../utils');

const transporter = nodemailer.createTransport({
  host: config.SMTP.HOST,
  port: config.SMTP.PORT,
  secure: config.SMTP.PORT === 465,
  auth: {
    user: config.SMTP.USER,
    pass: config.SMTP.PASS,
  },
});

const sendEmail = async (subject, htmlBody) => {
  if (!config.SMTP.HOST || !config.SMTP.USER || !config.SMTP.PASS || !config.SMTP.TO) {
    log('Email notifications are disabled due to incomplete configuration.');
    return;
  }
  try {
    await transporter.sendMail({
      from: config.SMTP.USER,
      to: config.SMTP.TO,
      subject,
      html: htmlBody,
    });
    log(`Email sent successfully to: ${config.SMTP.TO}`);
  } catch (error) {
    log(`Error while sending email: ${error}`);
  }
};

module.exports = { sendEmail };
