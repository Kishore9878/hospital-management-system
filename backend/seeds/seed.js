import connectDb from "../db/conn.js";
import Doctor from "../models/doctor.model.js";
import { doctorsData } from "../utils/doctorsData.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
const seedData = async () => {
  try {
    await connectDb();

    // Optional: clear existing data before inserting
    // await User.deleteMany();

    // await Doctor.insertMany(doctorsData);
    const doctors = await Promise.all(
      doctorsData.map(async (doctor) => ({
        ...doctor,
        password: await bcrypt.hash(doctor.password, 10),
      }))
    );

    await Doctor.insertMany(doctors);

    console.log("✅ Data seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding user data:", error);
  } finally {
    process.exit(); // ensures the script ends
  }
};

seedData();
