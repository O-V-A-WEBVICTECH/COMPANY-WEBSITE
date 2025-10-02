import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g. "smtp.gmail.com"
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type SendPasswordResetEmailProps = {
  email: string;
  subject: string;
  url: string;
};

export async function sendPasswordResetEmail({
  email,
  subject,
  url,
}: SendPasswordResetEmailProps) {
  const html = `
    <p>Hello,</p>
    <p>You requested a password reset. Click the link below to set a new password:</p>
    <p><a href="${url}">${url}</a></p>
    <p>If you didn’t request this, you can safely ignore this email.</p>
  `;

  await transporter.sendMail({
    from: `"Support" <${process.env.SMTP_FROM}>`, // configured sender email
    to: email,
    subject,
    html,
  });
}
