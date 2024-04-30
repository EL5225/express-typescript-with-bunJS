import { Router } from "express";
import auth from "./auth";
import users from "./users";
import profiles from "./profiles";
import upload from "./upload";
import employees from "./employees";

const router = Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/profiles", profiles);
router.use("/upload", upload);
router.use("/employees", employees);

export default router;
