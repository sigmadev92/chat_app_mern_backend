import CustomError from "../../middlewares/errorHandler.js";
import {
  createNewUserRepo,
  findUserById,
  findUserByMail,
  findUserbyPasswordToken,
  getAllUsersRepo,
  saveProfile,
  saveProfilePic,
} from "./user.repository.js";
import sendTheMail from "../../config/mailer.js";
import userRegistration from "../../utils/emails/userRegistration.js";
import sendToken from "../../utils/responses/sendToken.js";
import { CLIENT_URL } from "../../config/env.js";
import crypto from "crypto";
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

  const pswrdMatched = await user.comparePassword(password);

  if (!pswrdMatched) {
    return next(new CustomError(403, "Invalid Password"));
  }
  //user is authenticated;
  sendToken(user, res, 200);
};

const getAuth = async (req, res) => {
  const userId = req.USER._id;
  const user = await findUserById(userId);
  return res.status(200).send({ success: true, user, token: req.token });
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

const recoverPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserByMail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate token
    const resetToken = await user.getResetPasswordToken();
    console.log(resetToken);
    await user.save();

    const resetURL = `${CLIENT_URL}/password/reset/${resetToken}`;

    const message = `
      <p>You requested a password reset</p>
      <p>Click <a href="${resetURL}">here</a> to reset your password.</p>
      <p>This link will expire in 10 minutes.</p>
    `;

    await sendTheMail({
      receiver: email,
      htmlString: message,
      subject: "Link for Updating Password",
    });

    res.status(200).json({ success: true, message: "Reset email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  try {
    const user = await findUserbyPasswordToken(resetPasswordToken);
    if (!user)
      return next(new CustomError(403, "Invalid token or token Expired"));

    // Update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProfilePic = async (req, res, next) => {
  try {
    const { path: imageUrl, filename: publicId } = req.file;

    console.log(imageUrl, publicId);

    await saveProfilePic(req.USER._id, imageUrl);
    res.status(200).json({
      success: true,
      imageUrl,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllUsers = async (req, res, next) => {
  const users = await getAllUsersRepo(req.USER._id);
  res.status(200).json({ success: true, users });
};

const updateProfile = async (req, res, next) => {
  const userId = req.USER._id;
  const data = req.body;

  if (!data) {
    return next(new CustomError(400, "Bldy Missing"));
  }

  try {
    const response = await saveProfile(userId, data);
    return res.status(200).json({ success: true, response });
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, error.message));
  }
};
export {
  registerUser,
  loginUser,
  getAuth,
  recoverPassword,
  resetPassword,
  updateProfilePic,
  getAllUsers,
  updateProfile,
};
