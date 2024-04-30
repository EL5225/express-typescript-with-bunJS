import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee,
} from "@/controllers";
import { authenticate } from "@/middlewares";
import upload from "@/middlewares/multer";
import { Router } from "express";

const employees = Router();

employees.get("/", authenticate, getEmployees);
employees.get("/:id", authenticate, getEmployeeById);
employees.post("/", upload.single("image"), authenticate, createEmployee);
employees.put("/:id", upload.single("image"), authenticate, updateEmployee);
employees.delete("/:id", authenticate, deleteEmployee);

export default employees;
