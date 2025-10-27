import { Router } from "express";
import {
  getAllUsers,
  loginUser,
  logoutUser,
  recoverPassword,
  updateProfilePic,
  registerUser,
  updatePassword,
} from "./user.controller.js";
import validateRegData from "../../middlewares/validations/users/registration.js";
import validateLoginData from "../../middlewares/validations/users/login.js";
import { authMiddleware } from "../../middlewares/authentication.js";
import upload from "../../config/multer.js";

const userRouter = Router();

userRouter.post("/register", validateRegData, registerUser);
userRouter.post("/login", validateLoginData, loginUser);
userRouter.get("/auth", authMiddleware, (req, res) => {
  return res
    .status(200)
    .send({ success: true, user: req.USER, token: req.token });
});
userRouter.post("/password/recover", recoverPassword);
userRouter.post("/password/update", updatePassword);
userRouter.get("/all", authMiddleware, getAllUsers);
userRouter.put(
  "/profile-pic",
  authMiddleware,
  upload.single("profilePic"),
  updateProfilePic
);
userRouter.get(
  "/logout",
  (req, res, next) => {
    console.log("came for logout");
    console.log(req.cookies.f3Token);
    next();
  },
  authMiddleware,
  logoutUser
);

export default userRouter;
