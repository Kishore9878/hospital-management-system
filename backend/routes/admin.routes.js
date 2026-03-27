import { Router } from "express";

import {
  isAdmin,
  isAdminOrDoctor,
  isAuthenticated,
} from "../middleware/auth.middleware.js";

import {
  // createDoctorByAdmin,
  // createPatientByAdmin,
  createUserByAdmin,
  deletePatientAndDoctorProfileByAdmin,
  getAllParientAndDoctors,
  getPatientAndDoctorProfileByAdmin,
  updatePatientAndDoctorProfileByAdmin,
  updatePatientAndDoctorProfileImage,
} from "../controllers/admin.controllers.js";
import { upload } from "../middleware/file.middleware.js";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  updateAppointmentStatus,
} from "../controllers/appointment.controllers.js";

const adminRouter = Router();
adminRouter.get("/all", getAllParientAndDoctors);
// adminRouter.post("/create-doctor", createDoctorByAdmin);
// adminRouter.post("/create-patient", createPatientByAdmin);
adminRouter.post("/create-user", createUserByAdmin);
adminRouter.get("/profile/:role/:id", getPatientAndDoctorProfileByAdmin);
adminRouter.put(
  "/profile/:userId",
  isAuthenticated,
  updatePatientAndDoctorProfileByAdmin
);
adminRouter.put(
  "/update-image/:role/:id",
  upload.single("profileImage"),
  isAuthenticated,
  updatePatientAndDoctorProfileImage
);

adminRouter.delete(
  "/:role/:id",
  isAuthenticated,
  // isAdmin,
  deletePatientAndDoctorProfileByAdmin
);

adminRouter.post(
  "/create/appointment",
  isAuthenticated,
  isAdmin,
  createAppointment
);
adminRouter.get(
  "/all/appointments",
  isAuthenticated,
  // isAdmin,
  getAllAppointments
);
adminRouter.delete(
  "/:appointmentId",
  isAuthenticated,
  isAdmin,
  deleteAppointment
);
adminRouter.put(
  "/:appointmentId/status",
  isAuthenticated,
  isAdminOrDoctor,
  updateAppointmentStatus
);

export default adminRouter;
