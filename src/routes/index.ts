import { Router } from "express";
import auth from "./auth";
import users from "./users";
import profiles from "./profiles";

const router = Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/profiles", profiles);

export default router;
