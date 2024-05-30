import cloudinary from "@/utils/cloudinary";
import { Request, Response } from "express";

export const uploadImage = async (req: Request, res: Response) => {
  await cloudinary.uploader.upload(
    req.file?.path!,
    {
      folder: "images",
      resource_type: "image",
    },
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          name: err.name,
          message: err.message,
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

export const deleteImage = async (req: Request, res: Response) => {
  const { public_id } = req.body;
  await cloudinary.uploader.destroy(
    public_id,
    (err: unknown, result: unknown) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err,
        });
      }
      res.status(200).json({
        success: true,
        data: result,
      });
    }
  );
};
