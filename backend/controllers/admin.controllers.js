import Appointment from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";
import Patient from "../models/patient.model.js";
import User from "../models/user.model.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { authHashPassword } from "../utils/passwordHandler.js";
// admin only
// export const createDoctorByAdmin = async (req, res) => {
//   const {
//     fullName,
//     email,
//     password,
//     department,
//     qualifications,
//     experienceYears,
//     phone,
//     age,
//     address,
//     gender,
//     availableDays,
//     availableTimes,
//     description,
//     bio,
//   } = req.body;

//   if (
//     !fullName ||
//     !email ||
//     !password ||
//     !department ||
//     !qualifications ||
//     !experienceYears ||
//     !phone ||
//     !age ||
//     !address ||
//     !availableDays ||
//     !availableTimes ||
//     !description
//   ) {
//     return res
//       .status(400)
//       .json({ success: false, message: "All required fields must be filled!" });
//   }
//   try {
//     const existsUser = await User.findOne({ email });
//     if (existsUser) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email already exists!" });
//     }

//     // 3️⃣ Normalize availableDays
//     let days = [];
//     if (typeof availableDays === "string") {
//       days = availableDays.split(",").map((d) => d.trim());
//     } else if (Array.isArray(availableDays)) {
//       days = availableDays;
//     }

//     // 4️⃣ Validate availableDays
//     const validDays = [
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday",
//     ];
//     const invalidDays = days.filter((day) => !validDays.includes(day));
//     if (invalidDays.length > 0) {
//       return res.status(400).json({
//         success: false,
//         message: `Invalid day(s): ${invalidDays.join(", ")}`,
//       });
//     }
//     // Create user
//     // const hashedPassword = await bcrypt.hash(password, 10);
//     const hashPassword = authHashPassword(password);
//     const user = await User.create({
//       fullName,
//       email,
//       password: hashPassword,
//       role: "doctor",
//     });

//     // Create doctor profile
//     const doctor = await Doctor.create({
//       user: user._id,
//       department,
//       qualifications,
//       experienceYears,
//       phone,
//       age,
//       address,
//       gender,
//       availableDays: days,
//       availableTimes,
//       description,
//       bio,
//     });

//     // res.status(201).json({ success: true, user, doctor });
//     return res
//       .status(201)
//       .json({ success: true, message: "Doctor created successfully", doctor });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// export const createPatientByAdmin = async (req, res) => {
//   const { fullName, email, password, age, gender, address, phone, bloodGroup } =
//     req.body;

//   try {
//     // Check if email already exists
//     const existsUser = await User.findOne({ email });
//     if (existsUser) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email already exists!" });
//     }

//     // Hash password
//     // const hashedPassword = await bcrypt.hash(password, 10);
//     const hashPassword = authHashPassword(password);

//     // Create user
//     const user = await User.create({
//       fullName,
//       email,
//       password: hashPassword,
//       role: "patient",
//     });

//     // Create patient profile linked to user
//     const patient = await Patient.create({
//       user: user._id,
//       age,
//       gender,
//       address,
//       phone,
//       bloodGroup,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Patient registered successfully!",
//       user,
//       patient,
//     });
//   } catch (error) {
//     console.error("Error creating patient:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

export const createUserByAdmin = async (req, res) => {
  try {
    const {
      role, // "doctor" or "patient"
      fullName,
      email,
      password,
      age,
      gender,
      address,
      phone,
      bloodGroup,
      // Doctor-specific fields
      department,
      qualifications,
      experienceYears,
      availableDays,
      availableTimes,
      description,
      bio,
    } = req.body;

    const normalizedGender = typeof gender === "string" ? gender.toLowerCase() : gender;

    if (!role || !["doctor", "patient"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be either 'doctor' or 'patient'",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists!" });
    }

    // Hash password
    const hashPassword = authHashPassword(password);

    // Create base user
    const user = await User.create({
      fullName,
      email,
      password: hashPassword,
      role,
    });

    // ---- Doctor Creation ----
    if (role === "doctor") {
      if (
        !department ||
        !qualifications ||
        !experienceYears ||
        !phone ||
        !age ||
        !address ||
        !availableDays ||
        !availableTimes ||
        !description
      ) {
        return res.status(400).json({
          success: false,
          message: "Missing required doctor fields!",
        });
      }

      // Normalize availableDays
      let days = [];
      if (typeof availableDays === "string") {
        days = availableDays.split(",").map((d) => d.trim());
      } else if (Array.isArray(availableDays)) {
        days = availableDays;
      }

      // Validate days
      const validDays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      const invalidDays = days.filter((day) => !validDays.includes(day));
      if (invalidDays.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid day(s): ${invalidDays.join(", ")}`,
        });
      }

      // Create doctor profile
      const doctor = await Doctor.create({
        user: user._id,
        department,
        qualifications,
        experienceYears,
        phone,
        age,
        address,
        gender,
        availableDays: days,
        availableTimes,
        description,
        bio,
      });

      return res.status(201).json({
        success: true,
        message: "Doctor created successfully!",
        user,
        doctor,
      });
    }

    // ---- Patient Creation ----
    if (role === "patient") {
      if (!age || !gender || !address || !phone) {
        return res.status(400).json({
          success: false,
          message: "Missing required patient fields!",
        });
      }

      const patient = await Patient.create({
        user: user._id,
        age,
        gender: normalizedGender,
        address,
        phone,
        bloodGroup,
      });

      return res.status(201).json({
        success: true,
        message: "Patient created successfully!",
        user,
        patient,
      });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// doctor and patient by admin
export const getPatientAndDoctorProfileByAdmin = async (req, res) => {
  try {
    const { id, role } = req.params;

    if (!role || !["patient", "doctor"].includes(role.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing role. Must be 'patient' or 'doctor'.",
      });
    }

    let profile;

    if (role === "patient") {
      profile = await Patient.findById(id)
        .populate("user", "fullName email role profileImage createdAt")
        .lean();
    } else if (role === "doctor") {
      profile = await Doctor.findById(id)
        .populate("user", "fullName email role profileImage createdAt")
        .lean();
    }

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: `${role.charAt(0).toUpperCase() + role.slice(1)} not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `${
        role.charAt(0).toUpperCase() + role.slice(1)
      } fetched successfully`,
      profile,
    });
  } catch (error) {
    console.error("Error fetching user profile (admin):", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
    });
  }
};
export const updatePatientAndDoctorProfileByAdmin = async (req, res) => {
  const {
    fullName,
    email,
    age,
    phone,
    address,
    gender,
    department,
    qualifications,
    experienceYears,
    availableDays,
    availableTimes,
    description,
  } = req.body;
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // --- Update user base info (common fields) ---
    user.fullName = fullName || user.fullName;
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
            phone,
            address,
          },
        },
        { new: true }
      ).populate("user", "fullName email profileImage role");
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
            gender,
            availableDays,
            availableTimes,
            description,
          },
        },
        { new: true }
      ).populate("user", "fullName email profileImage role");
    }

    // --- Default (Admin or unrecognized role) ---
    return res.status(200).json({
      success: true,
      message: "Profile updated",
      user: updatedProfile,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating profile",
    });
  }
};
export const updatePatientAndDoctorProfileImage = async (req, res) => {
  try {
    const { id, role } = req.params; // role can be 'doctor' or 'patient'
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    // Find correct profile by role
    let profileModel =
      role === "doctor" ? Doctor : role === "patient" ? Patient : null;

    if (!profileModel) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be 'doctor' or 'patient'",
      });
    }

    const profile = await profileModel.findById(id).populate("user");
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: `${role} not found`,
      });
    }

    // Delete old Cloudinary image if exists
    if (profile.user?.profileImage?.public_id) {
      await deleteOnCloudinary(profile.user.profileImage.public_id);
    }

    // Upload new image to Cloudinary
    const image = await uploadOnCloudinary(file.path);
    if (!image || !image.url) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    // Update image in user model
    profile.user.profileImage = {
      public_id: image.public_id,
      url: image.url,
    };
    await profile.user.save();

    // Optional: if you want to track image update time in Doctor/Patient
    await profile.save();

    // Refetch with populated user data
    const updatedProfile = await profileModel.findById(id).populate("user");

    res.status(200).json({
      success: true,
      message: `${role} profile image updated successfully`,
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating profile image",
      error: error.message,
    });
  }
};

export const getAllParientAndDoctors = async (req, res) => {
  try {
    // Get all patients and doctors
    const patients = await Patient.find({}).populate("user");
    const doctors = await Doctor.find({}).populate("user");
    const appointments = await Appointment.find({});

    // Get today's date range
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Find today's appointments
    const todaysAppointments = await Appointment.find({
      appointmentDate: { $gte: startOfDay, $lte: endOfDay },
    })
      .populate("patient")
      .populate("doctor")
      .populate("user");

    // Counts
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    // const totalTodayAppointments = todaysAppointments.length;

    // Response
    return res.status(200).json({
      success: true,
      message: "Fetched all patients, doctors, and today's appointments",
      patients,
      doctors,
      appointments,
      todaysAppointments,
      totalPatients,
      totalDoctors,
      totalAppointments,
      // totalTodayAppointments,
    });
  } catch (error) {
    console.error(
      "Error getting all patients, doctors, and today's appointments:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Server error while fetching data",
      error: error.message,
    });
  }
};

export const deletePatientAndDoctorProfileByAdmin = async (req, res) => {
  try {
    const { id, role } = req.params;

    if (!role || !["doctor", "patient"].includes(role.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing role. Must be 'doctor' or 'patient'.",
      });
    }

    let Model = role === "doctor" ? Doctor : Patient;
    let profile = await Model.findById(id).populate("user");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: `${role.charAt(0).toUpperCase() + role.slice(1)} not found`,
      });
    }

    // 🧹 Delete Cloudinary image if exists
    if (profile.user?.profileImage?.public_id) {
      await deleteOnCloudinary(profile.user.profileImage.public_id);
    }

    // 🧹 Delete linked user
    if (profile.user?._id) {
      await User.findByIdAndDelete(profile.user._id);
    }

    // 🧹 Delete doctor/patient record
    await Model.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `${
        role.charAt(0).toUpperCase() + role.slice(1)
      } and related user deleted successfully`,
      profile,
    });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
