import { Router } from "express";
import {
  createPatientByAdmin,
  getAllPatients,
  getPatientByIdByAdmin,
  updateProfileByAdmin,
} from "../controllers/patient.controllers.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/file.middleware.js";
const patientRouter = Router();

patientRouter.post("/create", createPatientByAdmin);
patientRouter.get("/:userId", isAuthenticated, getPatientByIdByAdmin);
patientRouter.get("/all", isAuthenticated, getAllPatients);
patientRouter.put(
  "/admin/update-profile-image/:role/:id",
  upload.single("profileImage"),
  updateProfileByAdmin
);
export default patientRouter;
