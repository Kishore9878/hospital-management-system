import nodemailer from "nodemailer";
export const sendEmail = async (data) => {
  try {
    const mailUser = process.env.SMTP_MAIL || process.env.SMPT_MAIL;
    const mailPass = process.env.SMTP_PASS || process.env.SMPT_PASS;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    const mailOptions = {
      from: mailUser,
      to: data.email,
      subject: data.subject,
      text: data.message,
      html: data.html || data.message,
    };

    await transporter.sendMail(mailOptions);
    return true;
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.log("❌ Email not sent:", error);
  }
};
