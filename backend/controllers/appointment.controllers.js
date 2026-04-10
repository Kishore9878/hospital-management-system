import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";
import MedicalRecord from "../models/medicalrecord.model.js";
import mongoose from "mongoose";

// can create appointment user or admin
export const createAppointment = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      gender,
      age,
      doctorId,
      department,
      date,
      time,
      reason,
    } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "Doctor, date, and time are required",
      });
    }

    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found for current user",
      });
    }

    if (new Date(date) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Date cannot be in the past",
      });
    }

    const appointment = await Appointment.create({
      patient: patient._id,
      doctor: doctorId,
      fullName,
      email,
      phone,
      gender,
      department,
      age,
      date,
      time,
      reason,
    });

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment)
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });

    appointment.status = "completed";
    await appointment.save();

    // Auto-create medical record
    const medicalRecord = await MedicalRecord.create({
      patient: appointment.patient,
      doctor: appointment.doctor,
      appointment: appointment._id,
      diagnosis: "",
      treatment: "",
    });

    res.status(200).json({ success: true, appointment, medicalRecord });
  } catch (error) {
    console.error("Error completing appointment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate({
        path: "patient",
        populate: {
          path: "user", // fetch User info linked to the patient
          select: "fullName email profileImage role createdAt",
        },
      })
      .populate({
        path: "doctor",
        populate: {
          path: "user", // fetch User info linked to the patient
          select: "fullName email profileImage department",
        },
      });
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching all appointments:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!appointment)
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });

    res
      .status(200)
      .json({ success: true, message: "Appointment deleted", appointment });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Doctor :  get doctor's all appointments
export const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user._id; // Logged-in doctor user ID

    // Find doctor document by linked user
    const doctor = await Doctor.findOne({ user: doctorId });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Get all appointments for this doctor and deeply populate
    const appointments = await Appointment.find({ doctor: doctor._id })
      .populate({
        path: "doctor",
        populate: {
          path: "user", // fetch User info linked to the doctor
          select: "fullName email profileImage role createdAt",
        },
      })
      .populate({
        path: "patient",
        populate: {
          path: "user", // fetch User info linked to the patient
          select: "fullName email profileImage role createdAt",
        },
      })
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      // doctor,
      appointments,
    });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Doctor :  get doctor's today appointments
export const getTodaysAppointments = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const doctor = await Doctor.findOne({ user: doctorId });
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // Define start and end of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todaysAppointments = await Appointment.find({
      doctor: doctor._id,
      date: { $gte: startOfDay, $lte: endOfDay },
    })
      // .populate("patient", "age phone gender")
      .populate({
        path: "patient",
        select: "age phone gender",
        populate: {
          path: "user", // fetch User info linked to the doctor
          select: "fullName email profileImage role createdAt",
        },
      })
      .sort({ time: 1 }); // earliest first

    res.status(200).json({
      success: true,
      count: todaysAppointments.length,
      todaysAppointments,
    });
  } catch (error) {
    console.error("Error fetching today's appointments:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Doctor :  get Patient’s Appointments
export const getPatientAppointments = async (req, res) => {
  try {
    const patientId = req.user._id; // assuming logged-in patient user
    const patient = await Patient.findOne({ user: patientId });

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    const appointments = await Appointment.find({ patient: patient._id })
      .populate("doctor", "department qualifications experienceYears")
      .sort({ date: -1 });

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLoggedInPatientAppointments = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1️⃣ Verify this user is a patient
    const patient = await Patient.findOne({ user: userId });
    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient profile not found" });
    }

    // 2️⃣ Fetch all appointments for this patient
    const patientIds = [patient._id];
    if (mongoose.Types.ObjectId.isValid(userId)) {
      patientIds.push(userId);
    }

    const appointments = await Appointment.find({ patient: { $in: patientIds } })
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "fullName email profileImage",
        },
      })
      .populate({
        path: "patient",
        populate: { path: "user", select: "fullName email profileImage" },
      })
      .sort({ date: -1 }); // latest first

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};

export const getPatientAppointmentsThisWeek = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1️⃣ Verify patient exists
    const patient = await Patient.findOne({ user: userId });
    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    // 2️⃣ Get current week's start (Monday) and end (Sunday)
    const now = new Date();
    const day = now.getDay(); // Sunday = 0, Monday = 1 ...
    const diffToMonday = day === 0 ? -6 : 1 - day; // adjust Sunday
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() + diffToMonday);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    // 3️⃣ Fetch appointments within this week
    const patientIds = [patient._id];
    if (mongoose.Types.ObjectId.isValid(userId)) {
      patientIds.push(userId);
    }

    const appointments = await Appointment.find({
      patient: { $in: patientIds },
      date: { $gte: weekStart, $lte: weekEnd },
    })
      .populate({
        path: "doctor",
        populate: { path: "user", select: "fullName email profileImage" },
      })
      .populate({
        path: "patient",
        populate: { path: "user", select: "fullName email profileImage" },
      })
      .sort({ date: 1, time: 1 }); // ascending by date/time

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    console.error("Error fetching this week's appointments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch this week's appointments",
      error: error.message,
    });
  }
};

// Doctor :  get doctor's all appointments
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params; // Logged-in doctor user ID
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    ).populate("patient doctor");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: "Status updated successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
