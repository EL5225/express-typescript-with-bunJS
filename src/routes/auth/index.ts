import {
  authenticated,
  login,
  register,
  resendOtp,
  verifyOtp,
} from "@/controllers";
import { authenticate } from "@/middlewares";
import { Router } from "express";

const auth = Router();

auth.post("/register", register);
auth.post("/login", login);
auth.get("/authenticated", authenticate, authenticated);

// OTP
auth.post("/otp/verify", verifyOtp);
auth.post("/otp/resend", resendOtp);

export default auth;
