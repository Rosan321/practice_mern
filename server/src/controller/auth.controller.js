// here write the logic for the request and response of the api endpoints

import { createUser, findUserByUsername } from "../services/auth.services.js";
// import { comparePassword } from "../utils/hash.utils.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({
        statuscode: 400,
        message: "All fields are required",
      });
    }

    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({
        statuscode: 409,
        message: "User already exists",
      });
    }

    await createUser(username, password);
    res.status(201).json({
      status: "success",
      statuscode: 201,
      message: "User registered successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.log("Failed to parse text body as JSON:", e.message);
      }
    }
    const { username, password } = body || {};

    if (!username || !password) {
      return res.status(400).json({
        statuscode: 400,
        message: "Username and password are required",
      });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({
        statuscode: 401,
        message: "Invalid username or password",
      });
    }

    // To hashing the password we should use the below code
    // const isValid = await comparePassword(password, user.password);
    // if (!isValid) {
    //   return res.status(401).json({
    //     statuscode: 401,
    //     message: "Invalid username or password",
    //   });
    // }

    res.status(200).json({
      statuscode: 200,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statuscode: 500,
      message: "Internal server error",
    });
  }
};
