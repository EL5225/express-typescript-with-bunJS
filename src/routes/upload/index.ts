import { uploadImage } from "@/controllers";
import upload from "@/middlewares/multer";
import { Router } from "express";

const Upload = Router();

Upload.use("/", upload.single("image"), uploadImage);

export default Upload;
