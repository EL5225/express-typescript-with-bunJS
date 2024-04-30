import { deleteImage, uploadImage } from "@/controllers";
import { authenticate } from "@/middlewares";
import upload from "@/middlewares/multer";
import { Router } from "express";

const imageUploader = Router();

imageUploader.post("/", upload.single("image"), authenticate, uploadImage);
imageUploader.delete("/", authenticate, deleteImage);

export default imageUploader;
