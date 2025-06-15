const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or your provider
  auth: {
    user: 'effriiin26@gmail.com',
    pass: 'ngnm fvkw egfo ztro', // App password
  },
});

async function sendAppointmentMail(to, name, date, time) {
  const mailOptions = {
    from: `"Appointment Scheduler" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your Appointment is Scheduled',
    html: `
      <h2>Hello ${name},</h2>
      <p>Your appointment has been scheduled successfully.</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p>Thank you for using our appointment scheduler!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendAppointmentMail;
