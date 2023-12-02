import { getProfiles, updateProfile } from "@/controllers";
import { authenticate } from "@/middlewares";
import { Router } from "express";

const profiles = Router();

profiles.get("/", getProfiles);
profiles.patch("/", authenticate, updateProfile);

export default profiles;
