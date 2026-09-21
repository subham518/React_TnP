const mongoose = require('mongoose');
const User = require('../models/User');

const createCustomer = async (req, res, next) => {
  try {
    const { username, phone } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({ message: 'Username is required' });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const cleanPhone = phone.trim();
    if (!/^\d{10}$/.test(cleanPhone)) {
      return res.status(400).json({ message: 'Please provide a valid 10-digit phone number' });
    }

    const existingUser = await User.findOne({ phone: cleanPhone });
    if (existingUser) {
      return res.status(409).json({ message: 'Customer with this phone number already exists' });
    }

    const newUser = await User.create({
      username: username.trim(),
      phone: cleanPhone,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const getCustomers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const searchCustomers = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(200).json([]);
    }

    const searchTerm = q.trim();
    const regex = new RegExp(searchTerm, 'i');

    const users = await User.find({
      $or: [{ username: regex }, { phone: regex }],
    }).sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  searchCustomers,
  getCustomerById,
};
