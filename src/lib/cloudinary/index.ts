import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";
import { getFileNameWithoutExtension } from "../../utils";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const cloudinaryConfig = cloudinary;

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string,
  width = 1080,
  height = 1080
) => {
  const public_id = getFileNameWithoutExtension(file.filename);
  const res = await cloudinaryConfig.uploader.upload(file.path, {
    public_id,
    folder,
    transformation: [
      { width, height, crop: "scale" },
      { quality: "auto", fetch_format: "auto" },
    ],
  });
  fs.unlinkSync(file.path);
  if (!res) return false;
  return public_id;
};

export const getSecureUrl = (
  fileName: string,
  user_id: string
): string | null => {
  const publicId = `/${user_id}/${fileName}`;
  const result = cloudinary.url(publicId, { secure: true });
  if (result.length) {
    return result;
  }
  return null;
};
