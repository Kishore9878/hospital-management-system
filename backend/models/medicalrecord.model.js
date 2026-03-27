import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    diagnosis: { type: String, default: "" },
    treatment: { type: String, default: "" },
    prescription: { type: String, default: "" },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },
    followUpDate: { type: Date }, // optional follow-up date
  },
  { timestamps: true }
);

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
export default MedicalRecord;
