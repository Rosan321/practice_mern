import Auth from "../models/auth.model.js";

export const findUserByUsername = async (username) => {
  return await Auth.findOne({ username });
};

export const createUser = async ({ username, password }) => {
  return await Auth.create({
    username,
    password,
  });
};
