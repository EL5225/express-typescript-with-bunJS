import { prisma } from "@/libs";
import { NextFunction, Request, Response } from "express";
import { TGetAllUsersResponse } from "./types";

export const getUsers = async (
  req: Request,
  res: Response<TGetAllUsersResponse>,
  next: NextFunction
) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        is_verified: true,
      },
    });

    return res.status(200).json({
      message: "Success get all users",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
