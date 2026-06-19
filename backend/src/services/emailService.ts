import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter: nodemailer.Transporter | null = null;

// Lazily initialize transporter to support Ethereal account creation if needed
const getTransporter = async (): Promise<nodemailer.Transporter> => {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && port && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // True for 465, false for other ports
      auth: { user, pass },
    });
    console.log('Nodemailer SMTP Transporter configured.');
  } else {
    // Generate Ethereal testing account
    console.warn('SMTP settings missing. Generating Ethereal test account...');
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log(`Nodemailer Ethereal Transporter configured. Test User: ${testAccount.user}`);
  }

  return transporter;
};

export const sendOTPEmail = async (to: string, otp: string): Promise<void> => {
  const mailTransporter = await getTransporter();
  const fromEmail = process.env.SMTP_FROM || 'aryangwl19@gmail.com';

  const info = await mailTransporter.sendMail({
    from: `"Aruna-Nand EdTech Services Support" <${fromEmail}>`,
    to,
    subject: 'Activate Your Account - OTP Verification',
    text: `Your OTP for verification is: ${otp}. It will expire in 10 minutes.`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #FF7A00; text-align: center;">Welcome to Aruna-Nand EdTech Services</h2>
        <p>Dear student,</p>
        <p>Thank you for registering. Please verify your email address by using the 6-digit One Time Password (OTP) below:</p>
        <div style="font-size: 24px; font-weight: bold; text-align: center; padding: 15px; background-color: #f7f7f7; border-radius: 4px; letter-spacing: 4px; margin: 20px 0; color: #1B254B;">
          ${otp}
        </div>
        <p style="color: #666; font-size: 12px; text-align: center;">This OTP is valid for 10 minutes. Do not share this code with anyone.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 11px; text-align: center; color: #999;">Aruna-Nand EdTech Services, Jahanveer Complex, Singpur Road, Morar, Gwalior, MP - 474011</p>
      </div>
    `,
  });

  // If using Ethereal, log the preview URL
  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) {
    console.log(`[Email Sent] Preview URL: ${previewUrl}`);
  } else {
    console.log(`[Email Sent] Message ID: ${info.messageId}`);
  }
};
