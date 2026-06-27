import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDb from "./db/conn.js";
import { error } from "./utils/error.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import doctorRouter from "./routes/doctor.routes.js";
import "dotenv/config";

const app = express();
// webjobportal
const port = process.env.PORT || 3060;

// handling uncaught error
process.on("uncaughtException", (err) => {
  console.log("Shut down server due to :", err.message);
});

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.FRONTENDAPI,
    ].filter(Boolean);

    // Allow requests with no origin (e.g. Postman)
    if (!origin) {
      return callback(null, true);
    }

    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app")
    ) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },

  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static("public"));



// just for test
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// routes
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/admin", adminRouter);

app.use(error);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server connected on port : ", port);
    });
  })
  .catch((error) => {
    console.log("Server Error : ", error);
  });
