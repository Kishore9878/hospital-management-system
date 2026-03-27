import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "hospital", // more meaningful folder name
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath); // delete local file after successful upload

    return {
      public_id: response.public_id,
      url: response.secure_url, //  use HTTPS version
    };
  } catch (error) {
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

// delet image
export const deleteOnCloudinary = async (public_id) => {
  if (!public_id) return null;
  try {
    return await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.log(error);
    return null;
  }
};
