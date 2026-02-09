// here write the logic for the request and response of the api endpoints

import { createUser, findUserByUsername } from "../services/auth.services.js";
import generateToken from "../utils/generateToken.utils.js";
import { comparePassword, hashPassword } from "../utils/hash.utils.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    await createUser({
      username,
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
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // ✅ ONLY bcrypt comparison
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const payload = generateToken({
      userId: user._id,
      username: user.username,
    });

    const accessToken = generateToken(payload);
    const refreshToken = genrateRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if(!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_TOKEN_SECRET);

    const accessToken = generateToken({
      userId: decoded.userId,
      username: decoded.username,
    });

    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    console.error("REFRESH ACCESS TOKEN ERROR:", error);
    res.status(401).json({
      message: "Invalid refresh token",
    });
  }
}
