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
    const allowedOrigins = (process.env.FRONTENDAPI || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // allow requests with no origin
    if (!origin) {
      return callback(null, true);
    }

    // allow configured frontend domains
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // allow localhost during development
    if (/^https?:\/\/localhost:\d+$/i.test(origin)) {
      return callback(null, true);
    }

    if (/^https?:\/\/127\.0\.0\.1:\d+$/i.test(origin)) {
      return callback(null, true);
    }

    // reject others
    return callback(new Error("Not allowed by CORS"));
  },

  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use(error);

// just for test
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// routes
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/admin", adminRouter);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server connected on port : ", port);
    });
  })
  .catch((error) => {
    console.log("Server Error : ", error);
  });
