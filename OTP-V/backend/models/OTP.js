// OTP model - stores one-time-passwords used for login, change-password
// and forgot-password flows.

const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  otp: {
    type: String,
    required: true,
  },
  // purpose tells us WHY this OTP was generated, so an OTP made for login
  // cannot accidentally be used to reset a password, etc.
  purpose: {
    type: String,
    required: true,
    enum: ["LOGIN", "CHANGE_PASSWORD", "FORGOT_PASSWORD"],
  },
  // if this is a CHANGE_PASSWORD otp, we temporarily store the new
  // (already hashed) password here until the OTP is verified.
  pendingPasswordHash: {
    type: String,
    default: null,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  attempts: {
    type: Number,
    default: 0, // number of incorrect attempts made so far
  },
  used: {
    type: Boolean,
    default: false, // a correct OTP can only be used once
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// TTL index: MongoDB will automatically delete OTP documents some time
// after they expire, so old OTPs don't pile up in the database.
// This does NOT replace our manual expiry check in the controller -
// we still always check `expiresAt` ourselves because the TTL cleanup
// only runs periodically (about once a minute), not instantly.
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 300 });

module.exports = mongoose.model("OTP", otpSchema);
