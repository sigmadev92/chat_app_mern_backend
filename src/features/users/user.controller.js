import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CustomError from "../../middlewares/errorHandler.js";
import {
  createNewUserRepo,
  findUserById,
  findUserByMail,
} from "./user.repository.js";
import sendTheMail from "../../config/mailer.js";
import userRegistration from "../../utils/emails/userRegistration.js";
import sendToken from "../../utils/responses/sendToken.js";

const registerUser = async (req, res, next) => {
  try {
    const result = await createNewUserRepo(req.body);
    //we have to send mail
    const { email, fullName, test } = req.body;
    if (!test) {
      const htmlString = userRegistration({ fullName });
      await sendTheMail({
        receiver: email,
        htmlString,
        subject: "User Registration Successful",
      });
    }

    return res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user: result,
    });
  } catch (error) {
    //check if error is cza of duplicate email - send(403,"Email Already exists")
    next(error);
    //else send 503,error.message
  }
};

const loginUser = async (req, res, next) => {
  //check if email exists
  console.log("Reached Login ROute");
  const { email, password } = req.body;
  const user = await findUserByMail(email);
  if (!user) {
    return next(
      new CustomError(403, "This Email is not registered with our system")
    );
  }
  console.log("here-2");
  const pswrdMatched = await user.comparePassword(password);
  console.log("here2");
  if (!pswrdMatched) {
    return next(new CustomError(403, "Invalid Password"));
  }
  //user is authenticated;
  sendToken(user, res, 200);
};
export const logoutUser = async (req, res, next) => {
  res
    .status(200)
    .cookie("f3Token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, msg: "logout successful" });
};

const recoverPassword = async (req, res, next) => {};

const updatePassword = async (req, res, next) => {};

const updateName = async (req, res, next) => {};

const updateProfilePic = async (req, res, next) => {};

export {
  registerUser,
  loginUser,
  recoverPassword,
  updatePassword,
  updateName,
  updateProfilePic,
};
