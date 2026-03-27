import nodemailer from "nodemailer";
export const sendEmail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMPT_MAIL,
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
