import { config } from "dotenv";

config();

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const SMTP_MAIL = process.env.SMTP_MAIL;
const SMTP_PASS = process.env.SMTP_PASS;
const COOKIE_EXPIRES_IN = process.env.COOKIE_EXPIRES_IN;

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

export {
  PORT,
  MONGO_URI,
  JWT_SECRET_KEY,
  JWT_EXPIRES_IN,
  COOKIE_EXPIRES_IN,
  SMTP_MAIL,
  SMTP_PASS,
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_URL,
};
