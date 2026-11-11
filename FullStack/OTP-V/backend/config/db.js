// This file handles connecting to our MongoDB database using Mongoose.

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // If we cannot connect to the database, there is no point running the server.
    process.exit(1);
  }
};

module.exports = connectDB;
