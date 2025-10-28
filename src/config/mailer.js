import nodemailer from "nodemailer";
import { SMTP_MAIL, SMTP_PASS, JWT_SECRET_KEY } from "./env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_MAIL,
    pass: SMTP_PASS,
  },
});

async function sendTheMail({ receiver, subject, htmlString }) {
  console.log(SMTP_MAIL, SMTP_PASS, receiver, JWT_SECRET_KEY);
  try {
    await transporter.sendMail({
      from: SMTP_MAIL,
      to: receiver,
      subject,
      html: htmlString,
    });
  } catch (error) {
    console.log(error);
  }
}

export default sendTheMail;
