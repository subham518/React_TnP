// Small utility to generate a secure random 6-digit numeric OTP.

const crypto = require("crypto");

function generateOtp() {
  // crypto.randomInt gives us a secure random number.
  // This generates a number between 100000 and 999999 (always 6 digits).
  const otp = crypto.randomInt(100000, 1000000);
  return otp.toString();
}

module.exports = generateOtp;
