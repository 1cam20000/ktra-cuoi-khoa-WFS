import { UserModel } from "../models/user.Model.js";

//create user
const createUser = async (body) => {
  const user = await UserModel.create(body);
  return user;
};

//findOneUser to  check email existed
const findOneUser = async (query) => {
  const user = await UserModel.findOne(query).exec();
  return user;
};

//findOneUser to  check email existed
const findOneUserWithoutPassword = async (query) => {
  const user = await UserModel.findOne(query).select("-password").exec();
  return user;
};
//update user
const updateUser = async (id, body) => {
  const user = await UserModel.findByIdAndUpdate(id, body, {
    new: true,
  }).lean();
  return user;
};

const getDetailUserProfile = async (query) => {
  console.log("🚀 ~ getDetailUserProfile ~ query:", query);
  const user = await UserModel.findOne(query).select("-password").exec();
  return user;
};

export {
  createUser,
  findOneUser,
  updateUser,
  getDetailUserProfile,
  findOneUserWithoutPassword,
};
