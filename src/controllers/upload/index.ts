import cloudinary from "@/utils/cloudinary";
import { Request, Response } from "express";

export const uploadImage = async (req: Request, res: Response) => {
  cloudinary.uploader.upload(
    req.file?.path!,
    {
      folder: "images",
      resource_type: "image",
    },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }

      res.status(200).json({
        success: true,
        data: result,
        message: "Image uploaded successfully",
      });
    }
  );
};
