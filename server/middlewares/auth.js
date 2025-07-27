import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User is not authenticated",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    const user = await User.findById(decoded.id); // ✅ use _id not id
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    req.user = user; // ✅ now req.user._id will work
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};
