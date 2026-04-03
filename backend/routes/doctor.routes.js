import { Router } from "express";
import {
  getAllDoctors,
  // createDoctorByAdmin,
  // getDoctorProfileByAdmin,
  // updateDoctorDetailByAdmin,
  // updateProfileImageByAdmin,
  // deleteDoctorUsingIdByAdmin,
  getDoctorPatientDetails,
  getDoctorPatients,
  updateDoctorProfile,
} from "../controllers/doctor.controllers.js";
import { isAuthenticated, isDoctor } from "../middleware/auth.middleware.js";
// import { upload } from "../middleware/file.middleware.js";
import {
  getDoctorAppointments,
  getTodaysAppointments,
} from "../controllers/appointment.controllers.js";

const doctorRouter = Router();
doctorRouter.get("/all", isAuthenticated, getAllDoctors);
doctorRouter.get("/patients", isAuthenticated, isDoctor, getDoctorPatients);
doctorRouter.get(
  "/patient/:patientId",
  isAuthenticated,
  isDoctor,
  getDoctorPatientDetails
);

doctorRouter.get(
  "/appointments",
  isAuthenticated,
  isDoctor,
  getDoctorAppointments
);
doctorRouter.get(
  "/todays/appointments",
  isAuthenticated,
  isDoctor,
  getTodaysAppointments
);

doctorRouter.put(
  "/update/profile",
  isAuthenticated,
  isDoctor,
  updateDoctorProfile
);

// doctorRouter.post("/create", createDoctorByAdmin);
// doctorRouter.get(
//   "/profile/:doctorId",
//   isAuthenticated,
//   getDoctorProfileByAdmin
// );
// doctorRouter.put(
//   "/profile/:doctorId",
//   isAuthenticated,
//   updateDoctorDetailByAdmin
// );

// doctorRouter.put(
//   "/update-image/:doctorId",
//   isAuthenticated,
//   // isAdmin,
//   upload.single("profileImage"),
//   updateProfileImageByAdmin
// );
// doctorRouter.delete(
//   "/:doctorId",
//   isAuthenticated,
//   // isAdmin,
//   deleteDoctorUsingIdByAdmin
// );

export default doctorRouter;
