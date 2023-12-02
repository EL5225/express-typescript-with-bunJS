import { TGenericResponse } from "@/utils";
import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const notFound = (
  req: Request,
  res: Response<TGenericResponse<String, null>>
) => {
  return res.status(404).json({
    message: "Not found",
  });
};

export const internalServerError = (
  error: Error,
  req: Request,
  res: Response<TGenericResponse<String, Error>>,
  next: NextFunction
) => {
  if (error instanceof Error) {
    return res.status(500).json({
      message: error.message,
    });
  }
  next(error);
};

export const zodErrorHandler = (
  error: ZodError,
  req: Request,
  res: Response<TGenericResponse<String, Error>>,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: error.errors[0].message,
    });
  }
  next(error);
};

export const prismaErrorHandlrer = (
  err:
    | Prisma.PrismaClientInitializationError
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientRustPanicError
    | Prisma.PrismaClientUnknownRequestError
    | Prisma.PrismaClientValidationError,
  req: Request,
  res: Response<TGenericResponse<string, null>>,
  next: NextFunction
) => {
  if (err instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({
      message: err?.message,
    });
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(400).json({
      message: err?.meta?.cause as string,
    });
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    res.status(500).json({
      message: err?.message,
    });
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    res.status(400).json({
      message: err?.message,
    });
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({
      message: err?.message,
    });
  }

  return next(err);
};
