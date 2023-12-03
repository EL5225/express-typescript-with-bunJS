import { prisma } from "@/libs";
import { ICustomRequest, TGenericResponse } from "@/utils";
import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const { JWT_SECRET } = process.env;

export const authenticate = (
  req: ICustomRequest,
  res: Response<TGenericResponse<string, null>>,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (authorization.split(" ")[0] !== "Bearer") {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = decoded as JwtPayload;

    next();
  });
};
