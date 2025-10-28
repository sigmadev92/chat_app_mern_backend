import { JWT_SECRET_KEY } from "../config/env.js";
import CustomError from "./errorHandler.js";
import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  const token = req.header.authorization || req.cookies.f3Token;
  if (!token) {
    return next(new CustomError(400, "Auth credentials not found"));
  }

  const result = jwt.verify(token, JWT_SECRET_KEY);
  console.log(result);

  if (!result) {
    return next(
      new CustomError(403, "Invalid Credentials. Please login to continue")
    );
  }

  req.USER = { ...result, iat: "", exp: "" };
  delete req.USER.iat;
  delete req.USER.exp;
  req.token = token;
  next();
};

export { authMiddleware };
