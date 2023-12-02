import { prisma } from "@/libs";
import { ICustomRequest, TGenericResponse } from "@/utils";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

export const authenticate = (
  req: ICustomRequest,
  res: Response,
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

  jwt.verify(token, JWT_SECRET as string, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = {
      id: (decoded as { id: string }).id,
    };

    next();
  });
};
