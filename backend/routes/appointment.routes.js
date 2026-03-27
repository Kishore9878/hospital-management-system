// import express from "express";
// import {
//   isAdmin,
//   isAuthenticated,
//   isDoctor,
// } from "../middleware/auth.middleware.js";
// import {
//   completeAppointment,
//   createAppointment,
//   deleteAppointment,
//   getAllAppointments,
// } from "../controllers/appointment.controllers.js";

// const appointmetRouter = express.Router();
// // appontment can create user and admin as well

// appointmetRouter.post("/create", isAuthenticated, createAppointment);

// appointmetRouter.put(
//   "/complete/:appointmentId",
//   isAuthenticated,
//   completeAppointment
// );

// // Admin routes
// appointmetRouter.delete(
//   "/delete/:appointmentId",
//   isAuthenticated,
//   deleteAppointment
// );

// export default appointmetRouter;
