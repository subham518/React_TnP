const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // always saved in lowercase
    trim: true,
  },
  // NOTE: stored as plain text ONLY because this is a learning project.
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String, // optional
    trim: true,
  },
});

module.exports = mongoose.model("User", userSchema);
