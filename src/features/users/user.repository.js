import Users from "./user.model.js";

const createNewUserRepo = async (newUserData) => {
  const newUSer = await Users(newUserData);
  await newUSer.save();
  return newUSer;
};

const findUserById = async (_id) => {
  return await Users.findById(_id);
};
const findUserByMail = async (email) => {
  return await Users.findOne({ email }).select("+password");
};

const findUserbyPasswordToken = async (resetPasswordToken) => {
  const user = await Users.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  return user;
};
const getAllUsersRepo = async (userId) => {
  return await Users.find({ _id: { $ne: userId } });
};

const saveProfilePic = async (userId, imageUrl) => {
  try {
    const user = await Users.findById(userId);
    user.profilePic = imageUrl;
    await user.save();
  } catch (error) {
    console.log(error);
  }
};
export {
  createNewUserRepo,
  findUserById,
  findUserByMail,
  findUserbyPasswordToken,
  getAllUsersRepo,
  saveProfilePic,
};
