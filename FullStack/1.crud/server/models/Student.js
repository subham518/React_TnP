const mongoose = require('mongoose');

// Define the Schema for a Student
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    rollNo: {
      type: String,
      required: [true, 'Roll number is required'],
      unique: true,
      trim: true,
    },
    course: {
      type: String,
      required: [true, 'Course is required'],
      trim: true,
      maxlength: [100, 'Course name cannot exceed 100 characters'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [1, 'Age must be a positive number'],
      max: [120, 'Age must be realistic'],
    },
  },
  {
    // Automatically creates 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

module.exports = mongoose.model('Student', studentSchema);
