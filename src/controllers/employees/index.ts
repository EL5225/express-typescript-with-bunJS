import { prisma, VSEmployees } from "@/libs";
import { NextFunction, Request, Response } from "express";
import {
  TCreateEmployeeResponse,
  TDeleteEmployeeResponse,
  TGetAllEmployeesResponse,
  TGetEmployeeResponse,
  TUpdateEmployeeResponse,
} from "./type";
import { Employees } from "@prisma/client";
import cloudinary from "@/utils/cloudinary";

export const getEmployees = async (
  _: Request,
  res: Response<TGetAllEmployeesResponse>,
  next: NextFunction
) => {
  try {
    const employees = await prisma.employees.findMany();

    return res.status(200).json({
      message: "Employees fetched successfully",
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response<TGetEmployeeResponse>
) => {
  try {
    const employeeId: string = req.params.id;
    const employee = await prisma.employees.findUnique({
      where: { id: employeeId },
    });

    return res.status(200).json({
      message: "Employee fetched successfully",
      data: employee,
    });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const createEmployee = async (
  req: Request,
  res: Response<TCreateEmployeeResponse>,
  next: NextFunction
) => {
  try {
    const dataEmployee: Employees = req.body;
    VSEmployees.parse(req.body);

    await cloudinary.uploader.upload(
      req.file?.path!,
      {
        folder: "images",
        resource_type: "image",
      },
      (err, result) => {
        if (err) {
          return res.status(400).json({
            message: "Failed to upload image | " + err.message,
          });
        }
        dataEmployee.image_url = result?.secure_url!;
      }
    );

    const employee = await prisma.employees.create({
      data: {
        name: dataEmployee.name,
        province: dataEmployee.province,
        city: dataEmployee.city,
        position: dataEmployee.position,
        religion: dataEmployee.religion,
        image_url: dataEmployee.image_url,
      },
    });

    return res.status(200).json({
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response<TDeleteEmployeeResponse>
) => {
  try {
    const employeeId: string = req.params.id;
    const employee = await prisma.employees.findUnique({
      where: { id: employeeId },
    });
    const imageId = employee?.image_url?.split("/").pop()?.split(".")[0];
    const publicId = "images/" + imageId;

    await cloudinary.uploader.destroy(publicId!);
    await prisma.employees.delete({ where: { id: employeeId } });
    return res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response<TUpdateEmployeeResponse>,
  next: NextFunction
) => {
  try {
    const dataEmployee: Employees = req.body;
    const employeeId: string = req.params.id;
    VSEmployees.parse(req.body);

    if (req.file?.path) {
      const employee = await prisma.employees.findUnique({
        where: { id: employeeId },
      });
      const imageId = employee?.image_url?.split("/").pop()?.split(".")[0];
      const publicId = "images/" + imageId;

      await cloudinary.uploader.destroy(publicId!);
      await cloudinary.uploader.upload(
        req.file?.path!,
        {
          folder: "images",
          resource_type: "image",
        },
        (err, result) => {
          if (err) {
            return res.status(400).json({
              message: "Failed to upload image | " + err.message,
            });
          }
          dataEmployee.image_url = result?.secure_url!;
        }
      );
    }

    const result = await prisma.employees.update({
      where: { id: employeeId },
      data: {
        name: dataEmployee.name,
        province: dataEmployee.province,
        city: dataEmployee.city,
        position: dataEmployee.position,
        religion: dataEmployee.religion,
        image_url: dataEmployee.image_url,
      },
    });

    return res.status(200).json({
      message: "Employee updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
