import { prisma } from "@/libs";
import resend from "../../resend";

export const generateOTP = async (user_id: string) => {
  if (!user_id) {
    throw new Error("User ID is required");
  }

  const existOtp = await prisma.otp.findFirst({
    where: {
      user_id,
    },
  });

  if (existOtp) {
    await prisma.otp.delete({
      where: {
        id: existOtp.id,
      },
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const exp = Date.now() + 5 * 60 * 1000;

  return await prisma.otp.create({
    data: {
      otp_code: otp,
      exp,
      user_id: user_id,
    },
    select: {
      otp_code: true,
      exp: true,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  if (!email) {
    throw new Error("Email is required");
  }

  return await prisma.users.findUnique({
    where: {
      email,
    },
  });
};

export const sendOtp = async (otp_code: number, user_email: string) => {
  const { data, error } = await resend.emails.send({
    from: "Zora Company <onboarding@resend.dev>",
    to: user_email,
    subject: "OTP Code verification",
    html: `<strong>This is ur OTP CODE for verification</strong> <strong>${otp_code}</strong>`,
  });

  if (error) throw new Error(error.message);

  return {
    message: "otp sent successfully",
    data: data?.id,
  };
};
