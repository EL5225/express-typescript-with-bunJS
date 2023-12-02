import { prisma, VSLogin, VSRegister, VSResendOTP, VSVerifyOTP } from "@/libs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  NextFunction,
  Request,
  RequestHandler,
  RequestParamHandler,
  Response,
} from "express";
import {
  TLoginRequest,
  TLoginResponse,
  TRegisterRequest,
  TRegisterResponse,
  TVerifyOTPRequest,
  TVerifyOTPResponse,
} from "./types";
import {
  generateOTP,
  getUserByEmail,
  ICustomRequest,
  TGenericResponse,
} from "@/utils";
const { JWT_SECRET } = process.env;

export const register = async (
  req: Request,
  res: Response<TRegisterResponse>,
  next: NextFunction
) => {
  try {
    const {
      name,
      email,
      password,
      confirm_password,
      phone_number,
    }: TRegisterRequest = req.body;

    VSRegister.parse(req.body);

    const existUser = await getUserByEmail(email);

    if (existUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    if (password !== confirm_password) {
      return res.status(400).json({
        message: "Password not match",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: encryptedPassword,
        profile: {
          create: {
            phone_number,
          },
        },
      },

      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const otp = await generateOTP(user.id);

    res.status(201).json({
      message: `User created successfully, Please verify your account first with OTP code ${otp.otp_code}`,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response<TLoginResponse>,
  next: NextFunction
) => {
  try {
    const { email, password }: TLoginRequest = req.body;
    VSLogin.parse(req.body);

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: "email or password invalid",
      });
    }

    if (!user.is_verified) {
      return res.status(400).json({
        message: "Please verify your email first",
      });
    }

    const decryptedPassword = await bcrypt.compare(password, user.password);

    const token = jwt.sign({ id: user.id }, JWT_SECRET as string, {
      expiresIn: "15m",
    });

    if (!decryptedPassword) {
      return res.status(400).json({
        message: "email or password invalid",
      });
    }

    res.status(200).json({
      message: "Login successfully",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          is_verified: user.is_verified,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (
  req: Request,
  res: Response<TVerifyOTPResponse>,
  next: NextFunction
) => {
  try {
    const { email, otp }: TVerifyOTPRequest = req.body;
    VSVerifyOTP.parse(req.body);

    if (otp.length !== 6) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        is_verified: true,
        otp: true,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (user.is_verified) {
      return res.status(400).json({
        message: "User already verified",
      });
    }

    if (user.otp) {
      if (user.otp.exp < Date.now()) {
        return res.status(400).json({
          message: "OTP expired",
        });
      }

      if (user.otp.otp_code !== Number(otp)) {
        return res.status(400).json({
          message: "Invalid OTP",
        });
      }
    }

    await prisma.users.update({
      where: {
        email,
      },
      data: {
        is_verified: true,
      },
    });

    await prisma.otp.delete({
      where: {
        user_id: user.id,
      },
    });

    res.status(200).json({
      message: "User verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const resendOtp = async (
  req: Request,
  res: Response<TGenericResponse<string, null>>,
  next: NextFunction
) => {
  try {
    const { email }: { email: string } = req.body;
    VSResendOTP.parse(req.body);

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (user.is_verified) {
      return res.status(400).json({
        message: "User already verified",
      });
    }

    const otp = await generateOTP(user.id);

    res.status(200).json({
      message: `OTP code ${otp.otp_code}`,
    });
  } catch (error) {
    next(error);
  }
};

export const authenticated = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const authenticatedUser = await prisma.users.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        is_verified: true,
        profile: {
          select: {
            id: true,
            phone_number: true,
            birth_date: true,
            birth_place: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      message: "Authenticated",
      data: authenticatedUser,
    });
  } catch (error) {
    next(error);
  }
};
