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
  // FRONTENDAPI can be a single origin or a comma-separated list.
  // Example: http://localhost:5173,http://localhost:5174
  origin: (origin, callback) => {
    const allowedOrigins = (process.env.FRONTENDAPI || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // If the request has no origin (like same-origin or server-to-server), allow it.
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);

    // Local dev convenience: allow any localhost/127.0.0.1 port.
    // This prevents "Access-Control-Allow-Origin missing" when the dev server port changes.
    if (/^https?:\/\/localhost:\d+$/i.test(origin)) return callback(null, true);
    if (/^https?:\/\/127\.0\.0\.1:\d+$/i.test(origin)) return callback(null, true);

    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
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
