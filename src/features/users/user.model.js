import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "../../config/env.js";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "user name is required"],
    maxLength: [30, "user name can't exceed 30 characters"],
    minLength: [2, "name should have atleast 2 charcters"],
  },
  email: {
    type: String,
    required: [true, "user email is required"],
    unique: [true, "email already registered"],
    validate: [validator.isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    select: false,
  },
  profilePic: {
    type: String,
  },
  gender: {
    type: String,
    default: "NS",
    enum: ["M", "F", "O", "NS"],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user"],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  //  hash user password before saving using bcrypt
  if (!this.isModified("password"))
    // only hash if not changed;
    return next();
  let hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      email: this.email,
      profilePic: this.profilePic,
    },
    JWT_SECRET_KEY,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
};
// user password compare
userSchema.methods.comparePassword = async function (password) {
  console.log(password, this.password);
  return await bcrypt.compare(password, this.password);
};

// generatePasswordResetToken
userSchema.methods.getResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hashing and updating user resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const Users = mongoose.model("User", userSchema);
export default Users;
