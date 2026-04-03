// import User from "../models/user.model.js";
// import { authHashPassword } from "../utils/passwordHandler.js";
import Doctor from "../models/doctor.model.js";
// import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import Patient from "../models/patient.model.js";
import Appointment from "../models/appointment.model.js";

// export const createDoctorByAdmin = async (req, res) => {
//   const {
//     firstName,
//     lastName,
//     email,
//     password,
//     department,
//     qualifications,
//     experienceYears,
//     phone,
//     age,
//     address,
//     availableDays,
//     availableTimes,
//     description,
//   } = req.body;

//   if (
//     !firstName ||
//     !lastName ||
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
//       firstName,
//       lastName,
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
//       availableDays: days,
//       availableTimes,
//       description,
//     });

//     // res.status(201).json({ success: true, user, doctor });
//     return res
//       .status(201)
//       .json({ success: true, message: "Doctor created successfully", doctor });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getDoctorProfileByAdmin = async (req, res) => {
//   try {
//     // The logged-in user's ID is assumed to come from middleware (JWT auth)
//     const { doctorId } = req.params;

//     // Find doctor profile linked to the user
//     // const doctor = await Doctor.findOne({ user: doctorId })
//     const doctor = await Doctor.findOne({ _id: doctorId })
//       .populate("user", "firstName lastName email role profileImage createdAt") // Populate user info
//       .lean();

//     if (!doctor) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Doctor profile not found" });
//     }

//     res.status(200).json({ success: true, profile: doctor });
//   } catch (error) {
//     console.error("Error fetching doctor profile:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// export const updateDoctorDetailByAdmin = async (req, res) => {
//   const { doctorId } = req.params;
//   const {
//     firstName,
//     lastName,
//     email,
//     department,
//     qualifications,
//     experienceYears,
//     phone,
//     age,
//     address,
//     availableDays,
//     availableTimes,
//     description,
//   } = req.body;

//   try {
//     // ✅ Step 1: Update the user details (from User model)
//     // const updatedUser = await User.findByIdAndUpdate(
//     //   userId,
//     //   { $set: { firstName, lastName, email } },
//     //   { new: true }
//     // );

//     // if (!updatedUser) {
//     //   return res
//     //     .status(404)
//     //     .json({ success: false, message: "User not found" });
//     // }

//     // ✅ Step 2: Update doctor details (from Doctor model)
//     // const updatedDoctor = await Doctor.findOneAndUpdate(
//     //   { _id: doctorId },
//     //   {
//     //     $set: {
//     // department,
//     // qualifications,
//     // experienceYears,
//     // phone,
//     // age,
//     // address,
//     // availableDays,
//     // availableTimes,
//     //     },
//     //   },
//     //   { new: true }
//     // );

//     // if (!updatedDoctor) {
//     //   return res
//     //     .status(404)
//     //     .json({ success: false, message: "Doctor not found" });
//     // }

//     const doctor = await Doctor.findOne({ _id: doctorId }).populate("user");
//     if (!doctor) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Doctor profile not found" });
//     }

//     console.log("  doctor.user.firstName :", doctor.user.firstName);

//     doctor.user.firstName = firstName || doctor.user.firstName;
//     doctor.user.lastName = lastName || doctor.user.lastName;
//     doctor.user.email = email || doctor.user.email;
//     doctor.department = department || doctor.department;
//     doctor.qualifications = qualifications || doctor.qualifications;
//     doctor.experienceYears = experienceYears || doctor.experienceYears;
//     doctor.phone = phone || doctor.phone;
//     doctor.age = age || doctor.age;
//     doctor.address = address || doctor.address;
//     doctor.availableDays = availableDays || doctor.availableDays;
//     doctor.availableTimes = availableTimes || doctor.availableTimes;
//     doctor.description = description || doctor.description;

//     await doctor.user.save();
//     await doctor.save();

//     res.status(200).json({
//       success: true,
//       message: "Doctor details updated successfully",
//       doctor,
//     });
//   } catch (error) {
//     console.error("Error updating doctor:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Doctor or Admin can update profile image
// export const updateProfileImageByAdmin = async (req, res) => {
//   try {
//     const { doctorId } = req.params;
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({
//         success: false,
//         message: "No image uploaded",
//       });
//     }

//     //  Find doctor with related user
//     const doctor = await Doctor.findById(doctorId).populate("user");
//     if (!doctor) {
//       return res.status(404).json({
//         success: false,
//         message: "Doctor not found",
//       });
//     }

//     //  Delete old Cloudinary image if exists
//     if (doctor.user?.profileImage?.public_id) {
//       await deleteOnCloudinary(doctor.user.profileImage.public_id);
//     }

//     //  Upload new image to Cloudinary
//     const image = await uploadOnCloudinary(file.path);
//     if (!image || !image.url) {
//       return res.status(500).json({
//         success: false,
//         message: "Image upload failed",
//       });
//     }

//     //  Update both user + doctor fields
//     doctor.user.profileImage = {
//       public_id: image.public_id,
//       url: image.url,
//     };
//     // doctor.user.firstName = firstName || doctor.user.firstName;
//     // doctor.experienceYears = experienceYears || doctor.experienceYears;

//     //  Save both models
//     await doctor.user.save();
//     await doctor.save();

//     // 6️⃣ Refetch with latest data
//     const updatedDoctor = await Doctor.findById(doctorId).populate("user");

//     res.status(200).json({
//       success: true,
//       message: "Doctor profile image and details updated successfully",
//       doctor: updatedDoctor,
//     });
//   } catch (error) {
//     console.error("Error updating profile image:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const deleteDoctorUsingIdByAdmin = async (req, res) => {
//   const { doctorId } = req.params;

//   try {
//     // 1️⃣ Find the doctor
//     const doctor = await Doctor.findById(doctorId).populate("user");
//     if (!doctor) {
//       return res.status(404).json({
//         success: false,
//         message: "Doctor not found",
//       });
//     }

//     // 2️⃣ Delete profile image from Cloudinary (if any)
//     if (doctor.user?.profileImage?.public_id) {
//       await deleteOnCloudinary(doctor.user.profileImage.public_id);
//     }

//     // 3️⃣ Delete the doctor record
//     await Doctor.findByIdAndDelete(doctorId);

//     // 4️⃣ Delete the linked user record (optional)
//     if (doctor.user?._id) {
//       await User.findByIdAndDelete(doctor.user._id);
//     }

//     res.status(200).json({
//       success: true,
//       message: "Doctor and related user deleted successfully",
//       doctor,
//     });
//   } catch (error) {
//     console.error("Error deleting doctor:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Internal Server Error",
//     });
//   }
// };

// get doctor's all patients
export const getDoctorPatients = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const appointments = await Appointment.find({
      doctor: doctor._id,
    }).populate({
      path: "patient",
      populate: {
        path: "user",
        select: "fullName email profileImage age phone gender",
      },
    });

    const uniquePatients = [
      ...new Map(
        appointments.map((a) => [a.patient._id.toString(), a.patient])
      ).values(),
    ];

    return res.status(200).json({
      success: true,
      message: "Patients fetched successfully",
      patients: uniquePatients,
    });
  } catch (error) {
    console.error("Error fetching doctor patients:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching patients",
      error: error.message,
    });
  }
};
// get doctor's each patients details
// export const getDoctorPatientDetails = async (req, res) => {
//   try {
//     const doctorId = req.user._id;
//     const { patientId } = req.params;

//     // verify doctor exists
//     const doctor = await Doctor.findOne({ user: doctorId });
//     if (!doctor) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Doctor not found" });
//     }

//     // verify patient exists
//     const patient = await Patient.findById(patientId).populate(
//       "user",
//       "fullName email phone"
//     );
//     if (!patient) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Patient not found" });
//     }

//     // get appointments between this doctor and patient
//     const appointments = await Appointment.find({
//       doctor: doctor._id,
//       patient: patient._id,
//     }).sort({ date: -1 });

//     res.status(200).json({
//       success: true,
//       patient,
//       appointments,
//     });
//   } catch (error) {
//     console.error("Error fetching patient details:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const getDoctorPatientDetails = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const { patientId } = req.params;

    // Verify doctor exists
    const doctor = await Doctor.findOne({ user: doctorId });
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // Verify patient exists
    const patient = await Patient.findById(patientId).populate(
      "user",
      "fullName email phone"
    );
    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    // Get all appointments between this doctor and patient
    const appointments = await Appointment.find({
      doctor: doctor._id,
      patient: patient._id,
    })
      .sort({ date: -1 })
      .populate("doctor", "department qualifications")
      .populate("patient", "user")
      .lean();

    res.status(200).json({
      success: true,
      patient,
      appointments,
    });
  } catch (error) {
    console.error("Error fetching patient details:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching patient details",
      error: error.message,
    });
  }
};
export const getAllDoctors = async (req, res) => {
  try {
    // Verify doctor exists
    let doctors = await Doctor.find().populate("user");
    if (!doctors) {
      return res
        .status(404)
        .json({ success: false, message: "Doctors not found" });
    }

    // Verify patient exists
    // const patient = await Patient.findById(patientId).populate(
    //   "user",
    //   "fullName email phone"
    // );
    // if (!patient) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Patient not found" });
    // }

    // Get all appointments between this doctor and patient
    // const appointments = await Appointment.find({
    //   doctor: doctor._id,
    //   patient: patient._id,
    // })
    //   .sort({ date: -1 })
    //   .populate("doctor", "department qualifications")
    //   .populate("patient", "user")
    //   .lean();

    res.status(200).json({
      success: true,
      doctors,
      // appointments,
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching doctors",
      error: error.message,
    });
  }
};


export const updateDoctorProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, email, ...doctorData } = req.body;

    // 1️⃣ Update the User Model (fullName and Email)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 2️⃣ Find or Create/Update the Doctor Model
    let doctor = await Doctor.findOne({ user: userId });

    // Ensure required field safety for first-time creation
    const defaultDoctorData = {
      ...doctorData,
      bio: doctorData.bio || doctor?.bio || "",
      description:
        doctorData.description ||
        doctor?.description ||
        "Doctor description not provided yet.",
      department: doctorData.department || doctor?.department || "General_Medicine",
      qualifications:
        doctorData.qualifications || doctor?.qualifications || "Not specified",
      experienceYears:
        doctorData.experienceYears || doctor?.experienceYears || 0,
      phone: doctorData.phone || doctor?.phone || 0,
      age: doctorData.age || doctor?.age || 0,
      address: doctorData.address || doctor?.address || "Not specified",
      availableDays: doctorData.availableDays || doctor?.availableDays || [],
      availableTimes: doctorData.availableTimes || doctor?.availableTimes || "",
    };

    if (!doctor) {
      doctor = await Doctor.create({
        user: userId,
        ...defaultDoctorData,
      });
    } else {
      // Update fields like department, qualifications, availableDays, etc.
      doctor = await Doctor.findOneAndUpdate(
        { user: userId },
        { $set: doctorData },
        { new: true }
      );
    }

    // 3️⃣ Populate and return
    const populatedDoctor = await Doctor.findById(doctor._id).populate("user");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: populatedDoctor.user,   // Sent to Redux to update fullName/email
      doctor: populatedDoctor       // Sent to Redux for specific doctor stats
    });

  } catch (error) {
    console.error("Doctor update error:", error);
    res.status(500).json({
      success: false,
      message: "Doctor profile update failed",
      error: error.message
    });
  }
};
