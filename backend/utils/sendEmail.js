import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, message) => {
  try {
    const msg = {
      to: email,
      from: "hansrajvvs@gmail.com",
      subject: "Password Reset",
      text: message,
    };
    await sgMail.send(msg);
    console.log("Email sent to:", email);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

export default sendEmail;
