import { VSUpdateProfiles, prisma } from "@/libs";
import { NextFunction, Request, Response } from "express";
import {
  TGetAllProfilesResponse,
  TUpdateProfileRequest,
  TUpdateProfileResponse,
} from "./types";
import { ICustomRequest } from "@/utils";

export const getProfiles = async (
  req: Request,
  res: Response<TGetAllProfilesResponse>,
  next: NextFunction
) => {
  try {
    const profiles = await prisma.profiles.findMany({
      select: {
        id: true,
        phone_number: true,
        birth_date: true,
        birth_place: true,
      },
    });

    res.status(200).json({
      message: "Success get profiles",
      data: profiles,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: ICustomRequest,
  res: Response<TUpdateProfileResponse>,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const { phone_number, birth_date, birth_place }: TUpdateProfileRequest =
      req.body;

    VSUpdateProfiles.parse(req.body);

    const profile = await prisma.profiles.update({
      where: {
        user_id: typeof user === "string" ? user : user?.id,
      },
      data: {
        phone_number,
        birth_date,
        birth_place,
      },
    });

    res.status(200).json({
      message: "Success update profile",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};
