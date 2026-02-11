import jwt from "jsonwebtoken";
import Auth from "../models/auth.model.js";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ statusCode: 401, message: "Unauthorized access" });
    }

    const token = authHeader.split(" ")[1];

    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    const user = await Auth.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ statusCode: 401, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ statusCode: 401, message: "Token expired" });
  }
};

export default protect;
