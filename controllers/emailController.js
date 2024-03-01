const nodemailer = require("nodemailer");

// Create a transporter object using your email service's SMTP settings
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "aleksmihaylov1339@gmail.com",
    pass: "jsmnofwmmroedtmm",
  },
});

// Function to send a password reset email
const sendPasswordResetEmail = (toEmail, token) => {
  const mailOptions = {
    from: "aleksmihaylov1339@gmail.com",
    to: toEmail,
    subject: "Password Reset Request",
    html: `
      <p>You have requested a password reset. Click the following link to reset your password:</p>
      <a href="http://localhost:5173/reset-password/${token}">Reset Password</a>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendPasswordResetEmail;
