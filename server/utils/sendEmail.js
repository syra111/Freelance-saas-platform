const nodemailer = require("nodemailer");

const sendEmailNotification = async (email, jobTitle, status) => {
    console.log(email, jobTitle, status);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Bid Status Update for "${jobTitle}"`,
      text: `Your bid on "${jobTitle}" has been ${status}.`
    };
    console.log("Sending email:", mail);
    await transporter.sendMail(mail);
    console.log("Email sent successfully");
  } catch (err) {
    console.error("Email send error:", err.message);
  }
};

module.exports = sendEmailNotification;
