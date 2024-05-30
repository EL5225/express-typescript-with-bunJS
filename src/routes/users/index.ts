import { deleteUser, getUsers } from "@/controllers";
import { authenticate } from "@/middlewares";
import { Router } from "express";

const users = Router();

users.get("/", getUsers);
users.delete("/:id", authenticate, deleteUser);

export default users;
