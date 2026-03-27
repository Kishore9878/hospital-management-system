import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import "dotenv/config";
export const isAuthenticated = async (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    const token =
      req.cookies?.token || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: token missing",
      });
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Use _id or id depending on what you used when signing the token
    const userId = decodedToken._id || decodedToken.id;

    // Find the user without password
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found",
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: invalid or expired token",
      error: error.message,
    });
  }
};

// export const isAdmin = (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized: user not found",
//     });
//   }

//   if (req.user.role !== "admin") {
//     return res.status(403).json({
//       success: false,
//       message: "Access denied: admin only",
//     });
//   }

//   next();
// };

// Middleware: Allow only Doctor
export const isDoctor = (req, res, next) => {
  if (req.user?.role !== "doctor") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Doctor only",
    });
  }
  next();
};

// Middleware: Allow only Admin
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Admin only",
    });
  }
  next();
};

// ✅ Middleware: Allow Admin or Doctor
export const isAdminOrDoctor = (req, res, next) => {
  if (req.user?.role !== "admin" && req.user?.role !== "doctor") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Admins or Doctors only",
    });
  }
  next();
};
