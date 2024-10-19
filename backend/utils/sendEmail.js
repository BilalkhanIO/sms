// sendEmail.js
import nodemailer from 'nodemailer';
import config from '../config/config.js';

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: config.emailConfig.host,
    port: config.emailConfig.port,
    auth: {
      user: config.emailConfig.user,
      pass: config.emailConfig.pass,
    },
  });

  // Define email options
  const mailOptions = {
    from: config.emailConfig.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
