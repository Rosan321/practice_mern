import User from "../models/auth.model.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select("+password");
};

export const createUser = async ({ username, password, email }) => {
  return await User.create({
    username,
    password,
    email,
  });
};
