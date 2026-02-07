import Auth from "../models/auth.model.js";
import { hashPassword } from "../utils/hash.utils.js";

export const findUserByUsername = async (username) => {
  return await Auth.findOne({ username });
};

export const createUser = async (username, password) => {
//   const hashedPassword = await hashPassword(password);

  return await Auth.create({
    username,
    password
    // password: hashedPassword,
  });
};
