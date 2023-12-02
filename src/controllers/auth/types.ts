import { TGenericResponse } from "@/utils";

export type TRegisterRequest = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number: string;
};

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TVerifyOTPRequest = {
  email: string;
  otp: string;
};

export type TRegisterResponse = TGenericResponse<
  string,
  {
    id: string;
    name: string;
    email: string;
  }
>;

export type TLoginResponse = TGenericResponse<
  string,
  {
    user: {
      id: string;
      name: string;
      email: string;
      is_verified: boolean;
    };
    token: string;
  }
>;

export type TVerifyOTPResponse = TGenericResponse<string, null>;
