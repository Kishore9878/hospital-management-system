import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    phone: { type: Number, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    gender: { type: String },
    position: String,
    permissions: [String],
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
