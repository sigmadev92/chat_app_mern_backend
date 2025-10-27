import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";
import path from "path";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Extract file extension (jpg, png, pdf, etc.)
    const ext = path.extname(file.originalname).replace(".", "");

    // Get user ID from request (make sure to attach it before upload)
    const userId = req.USER?._id;

    // Determine file type
    const isImage = file.mimetype.startsWith("image/");
    const isPdf = file.mimetype === "application/pdf";

    // Folder paths
    const folder = isImage
      ? "project-one/images/profilePics"
      : isPdf
      ? "project-one/pdfs"
      : "project-one/others";

    // Return Cloudinary upload params
    return {
      folder,
      public_id: `${userId}`, // filename without extension
      format: ext, // keep original extension
      resource_type: isPdf ? "raw" : "image", // PDFs are 'raw', images are 'image'
      allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
    };
  },
});

const upload = multer({ storage });

export default upload;
