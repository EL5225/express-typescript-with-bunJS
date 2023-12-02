import { Request } from "express";

export interface IUser {
  id: string;
}

export interface ICustomRequest extends Request {
  user?: IUser;
}
