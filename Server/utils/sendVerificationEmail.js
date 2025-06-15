// utils/sendVerificationEmail.js

require('dotenv').config(); // ✅ RIGHT PLACE

const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'effriiin26@gmail.com',
      pass: 'ngnm fvkw egfo ztro', // App password
    },
  });

  const verificationLink = `${process.env.BACKEND_URL}/api/verify/${token}`; // Will now work correctly

  const mailOptions = {
    from: '"Your App" <your_email@gmail.com>',
    to: email,
    subject: 'Email Verification',
    html: `<p>Please verify your email by clicking the link below:</p>
           <a href="${verificationLink}">Verify Email</a>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
