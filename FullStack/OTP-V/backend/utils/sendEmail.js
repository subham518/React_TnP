// Reusable email utility built on top of Nodemailer.
// Any part of the app that needs to send an OTP email calls sendOtpEmail().

const nodemailer = require("nodemailer");

// Create a reusable transporter using our email credentials from .env
const transporter = nodemailer.createTransport({
  service: "gmail", // works well with Gmail + an "App Password"
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendOtpEmail(toEmail, otp) {
  const mailOptions = {
    from: `"OTP-V" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your OTP for OTP-V",
    text:
      `Your OTP for OTP-V is: ${otp}\n\n` +
      `This OTP is valid for 1 minute.\n\n` +
      `If you did not request this OTP, you can ignore this email.`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendOtpEmail;
