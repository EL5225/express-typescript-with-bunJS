import { prisma } from "@/libs";

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
