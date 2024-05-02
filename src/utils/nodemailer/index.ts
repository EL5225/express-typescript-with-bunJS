import nodemailer from "nodemailer";

export async function sendEmail(otp_code: number, identifier: string) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    await transport.sendMail({
      from: `Phoenix Company <${SMTP_EMAIL}>`,
      to: identifier,
      subject: "OTP Code verification",
      text: `here's your otp code ${otp_code}`,
      html: `<strong>This is ur OTP CODE for verification</strong> <strong>${otp_code}</strong>`,
    });
  } catch (error) {
    console.log(error);
  }
}
