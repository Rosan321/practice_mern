// here write the logic for the request and response of the api endpoints

import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../services/auth.services.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.utils.js";
import { comparePassword, hashPassword } from "../utils/hash.utils.js";

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await hashPassword(password);

    await createUser({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        message: "You are not registered!",
      });
    }

    // ✅ ONLY bcrypt comparison
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const payload = {
      userId: user._id,
      email: user.email,
      username: user.username,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      // maxAge: 1 * 60 * 1000, // 1 Minute
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ statusCode: 401, message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

    const accessToken = generateAccessToken({
      userId: decoded.userId,
      username: decoded.username,
    });

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("❌ JWT VERIFY ERROR:", error.message);
    return res
      .status(403)
      .json({ statusCode: 403, message: "Invalid refresh token" });
  }
};
