import bcrypt from "bcryptjs";
import Patient from "../models/patient.model.js";
import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";

// only admin can create
export const createPatientByAdmin = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    address,
    phone,
    bloodGroup,
  } = req.body;

  try {
    // Check if email already exists
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "patient",
    });

    // Create patient profile linked to user
    const patient = await Patient.create({
      user: user._id,
      age,
      gender,
      address,
      phone,
      bloodGroup,
    });

    res.status(201).json({
      success: true,
      message: "Patient registered successfully!",
      user,
      patient,
    });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getPatientByIdByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const patient = await Patient.findOne({ user: userId })
      .populate("user", "firstName lastName email role profileImage createdAt")
      .lean();

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    res.status(200).json({
      success: true,
      message: "Patient fetched successfully",
      patient,
    });
  } catch (error) {
    console.error("Error fetching patient (admin):", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProfileByAdmin = async (req, res) => {
  const { firstName, lastName, email, age, address, phone } = req.body;
  const { patientId } = req.params;

  try {
    const user = await User.findById(patientId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // --- Update user base info (common fields) ---
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    await user.save();

    let updatedProfile;

    // --- Patient role update ---
    if (user.role === "patient") {
      updatedProfile = await Patient.findOneAndUpdate(
        { user: user._id },
        {
          $set: {
            age,
            gender,
            phone,
            address,
            bloodGroup,
          },
        },
        { new: true }
      ).populate("user", "firstName lastName email role");
      return sendResponse(
        res,
        updatedProfile,
        200,
        "Patient profile updated successfully"
      );
    }

    // --- Doctor role update ---
    if (user.role === "doctor") {
      updatedProfile = await Doctor.findOneAndUpdate(
        { user: user._id },
        {
          $set: {
            age,
            department,
            qualifications,
            experienceYears,
            phone,
            address,
            availableDays,
            availableTimes,
          },
        },
        { new: true }
      ).populate("user", "firstName lastName email role");
      return sendResponse(
        res,
        updatedProfile,
        200,
        "Doctor profile updated successfully"
      );
    }

    // --- Default (Admin or unrecognized role) ---
    return res.status(400).json({
      success: false,
      message: "Role not supported for profile update",
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating profile",
    });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    return res.status(200).json({
      success: true,
      patients,
    });
  } catch (error) {
    console.error("Getting all patients error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while Getting all patients",
    });
  }
};
