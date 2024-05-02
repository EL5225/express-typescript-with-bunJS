import { z } from "zod";

export const VSRegister = z.object({
  name: z.string({ required_error: "name is required" }),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "password is required" })
    .min(6, { message: "password must be at least 6 characters long" }),
  confirm_password: z
    .string({ required_error: "confirm_password is required" })
    .min(6, { message: "confirm_password must be at least 6 characters long" }),
  phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" })
    .max(13, { message: "Phone number must be at most 13 characters long" })
    .optional(),
});

export const VSLogin = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "password is required" })
    .min(6, { message: "password must be at least 6 characters long" }),
});

export const VSVerifyOTP = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid email" }),
  otp: z
    .string({
      required_error: "otp is required",
    })
    .min(6, { message: "otp must be at most 6 characters long" }),
});

export const VSResendOTP = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid email" }),
});
