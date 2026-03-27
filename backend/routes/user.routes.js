import express, { Router } from "express";
import {
  allUsers,
  createAdmin,
  // createAccount,
  deleteAllUsers,
  deleteProfileAccount,
  getProfile,
  getUserAccountById,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  sendResetPasswordLink,
  updateProfile,
  updateProfileImage,
} from "../controllers/user.controllers.js";
import {
  isAdmin,
  isAdminOrDoctor,
  isAuthenticated,
} from "../middleware/auth.middleware.js";
import { upload } from "../middleware/file.middleware.js";
import {
  createAppointment,
  getLoggedInPatientAppointments,
  getPatientAppointmentsThisWeek,
} from "../controllers/appointment.controllers.js";

const userRouter = Router();

// user
userRouter.post("/create", isAuthenticated, isAdmin, createAdmin);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);

// user
userRouter.get("/profile", isAuthenticated, getProfile);
userRouter.put("/update/profile", isAuthenticated, updateProfile);
userRouter.put(
  "/upload-image",
  upload.single("profileImage"),
  isAuthenticated,
  updateProfileImage
);
userRouter.delete("/profile/delete", isAuthenticated, deleteProfileAccount);
userRouter.post("/forgot-password", sendResetPasswordLink);
userRouter.post("/reset-password/:token", resetPassword);

// admin
userRouter.get("/user/:id", isAuthenticated, getUserAccountById);
userRouter.get("/all", allUsers);
userRouter.delete("/delete-all", deleteAllUsers);
// userRouter.delete("/user/admin/delete/:id", isAuthenticated, deleteUserAccount);
userRouter.get("/user/admin/get/:id", isAuthenticated, getUserAccountById);
userRouter.post("/create/appointment", isAuthenticated, createAppointment);
userRouter.get(
  "/my-appointments",
  isAuthenticated,
  getLoggedInPatientAppointments
);

userRouter.get(
  "/my-appointments/this-week",
  isAuthenticated,
  getPatientAppointmentsThisWeek
);

export default userRouter;
