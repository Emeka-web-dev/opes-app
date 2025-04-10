import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: process.env.BREVO_HOST_URL,
  port: 465,
  secure: true,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS_KEY,
  },
});

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env
    .NEXT_PUBLIC_SITE_URL!}/auth/new-password?token=${token}`;

  const mailOptions = {
    from: `Opes Tech <${process.env.BREVO_USER}>`,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${confirmLink}">here</a> reset password.</p>`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env
    .NEXT_PUBLIC_SITE_URL!}/auth/new-verification?token=${token}`;
  const mailOptions = {
    from: `Opes Tech <${process.env.BREVO_USER}>`,
    to: email,
    subject: "Email Confirmation",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info.response);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: `Opes Tech <${process.env.BREVO_USER}>`,
    to: email,
    subject: "OTP Code",
    html: `<p>Your OTP Code: ${token}</p>`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
