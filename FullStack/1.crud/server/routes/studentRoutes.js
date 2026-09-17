const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/Student');

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * @route   POST /api/students
 * @desc    Create a new student
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    const { name, rollNo, course, age } = req.body;

    // Check for required fields upfront for clear error feedback
    if (!name || !rollNo || !course || age === undefined || age === null || age === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, rollNo, course, age.',
      });
    }

    const student = new Student({
      name,
      rollNo,
      course,
      age: Number(age),
    });

    const savedStudent = await student.save();

    return res.status(201).json({
      success: true,
      message: 'Student added successfully',
      data: savedStudent,
    });
  } catch (err) {
    // Handle duplicate roll number error (MongoDB error code 11000)
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: `Roll number '${req.body.rollNo}' already exists. Roll numbers must be unique.`,
      });
    }

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    console.error('Error creating student:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to create student',
      error: err.message,
    });
  }
});

/**
 * @route   GET /api/students
 * @desc    Get all students
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch all students sorted by most recently created
    const students = await Student.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (err) {
    console.error('Error fetching students:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve students',
      error: err.message,
    });
  }
});

/**
 * @route   GET /api/students/:id
 * @desc    Get a single student by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format',
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: student,
    });
  } catch (err) {
    console.error('Error fetching student by ID:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve student',
      error: err.message,
    });
  }
});

/**
 * @route   PUT /api/students/:id
 * @desc    Update an existing student
 * @access  Public
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rollNo, course, age } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format',
      });
    }

    // Build update payload
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (rollNo !== undefined) updateData.rollNo = rollNo;
    if (course !== undefined) updateData.course = course;
    if (age !== undefined) updateData.age = Number(age);

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: `Roll number '${req.body.rollNo}' is already taken by another student.`,
      });
    }

    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    console.error('Error updating student:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to update student',
      error: err.message,
    });
  }
});

/**
 * @route   DELETE /api/students/:id
 * @desc    Delete a student by ID
 * @access  Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format',
      });
    }

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: deletedStudent,
    });
  } catch (err) {
    console.error('Error deleting student:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete student',
      error: err.message,
    });
  }
});

module.exports = router;
