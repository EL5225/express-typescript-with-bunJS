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

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const user = await prisma.users.findUnique({
      where: { id: userId },
    });
    if (!user) {
      res.status(400).json({
        message: "User not found!",
      });
    }

    await prisma.users.delete({ where: { id: user?.id } });
    res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
    console.log(error);
    next(error);
  }
};
