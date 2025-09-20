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

export { createNewUserRepo, findUserById, findUserByMail };
