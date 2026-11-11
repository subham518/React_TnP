// Entry point of the backend server.

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// ---------- Middleware ----------

app.use(express.json()); // allows us to read JSON from request bodies
app.use(cookieParser()); // allows us to read cookies from requests

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // allow cookies to be sent/received
  })
);

// ---------- Routes ----------

app.use("/api/auth", authRoutes);

// Simple health check route
app.get("/", (req, res) => {
  res.send("OTP-V backend is running.");
});

// ---------- Start server ----------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
