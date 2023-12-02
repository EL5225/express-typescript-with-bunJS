import { getUsers } from "@/controllers";
import { Router } from "express";

const users = Router();

users.use("/", getUsers);

export default users;
