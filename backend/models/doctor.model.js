// import mongoose from "mongoose";

// const doctorSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     department: { type: String, required: true },
//     qualifications: { type: String, required: true },
//     experienceYears: { type: Number, required: true },
//     phone: { type: Number, required: true },
//     age: { type: Number, required: true },
//     address: { type: String, required: true },
//     availableDays: [
//       {
//         type: String,
//         enum: [
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//           "Sunday",
//         ],
//       },
//     ],
//     availableTimes: { type: String }, // e.g., "09:00-17:00"
//     appointments: [],
//     description: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Doctor = mongoose.model("Doctor", doctorSchema);
// export default Doctor;

import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // for data seed we need these fields
    // fullName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // email: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    //   lowercase: true,
    // },
    // password: {
    //   type: String,
    //   required: true,
    // },
    // profileImage: {
    //   public_id: { type: String, default: "" },
    //   url: { type: String, default: "" },
    // },
    // role: {
    //   type: String,
    //   enum: ["patient", "doctor", "admin"],
    //   default: "doctor",
    // },
    department: { type: String, required: true },
    qualifications: { type: String, required: true },
    experienceYears: { type: Number, required: true },
    phone: { type: Number, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    gender: { type: String },
    bloodGroup: { type: String },
    availableDays: [
      {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    ],
    availableTimes: { type: String }, // e.g., "09:00-17:00"
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    bio: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
