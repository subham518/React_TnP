const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

const createTransaction = async (req, res, next) => {
  try {
    const { userId, items, date } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Valid Customer ID is required' });
    }

    const customer = await User.findById(userId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'At least one item is required in the bill' });
    }

    let totalAmount = 0;
    const calculatedItems = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (!item.productName || !item.productName.trim()) {
        return res.status(400).json({ message: `Item #${i + 1} must have a product name` });
      }

      const price = Number(item.price);
      const quantity = Number(item.quantity);

      if (isNaN(price) || price <= 0) {
        return res.status(400).json({ message: `Item "${item.productName}" must have a price greater than 0` });
      }

      if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ message: `Item "${item.productName}" must have a quantity greater than 0` });
      }

      const itemAmount = price * quantity;
      totalAmount += itemAmount;

      calculatedItems.push({
        productName: item.productName.trim(),
        price,
        quantity,
        amount: itemAmount,
      });
    }

    const transaction = await Transaction.create({
      userId,
      items: calculatedItems,
      totalAmount,
      date: date || new Date().toISOString().split('T')[0],
    });

    const populatedTransaction = await Transaction.findById(transaction._id).populate(
      'userId',
      'username phone'
    );

    res.status(201).json(populatedTransaction);
  } catch (error) {
    next(error);
  }
};

const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find()
      .populate('userId', 'username phone')
      .sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

const getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const transaction = await Transaction.findById(id).populate('userId', 'username phone');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

const getCustomerTransactions = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const customer = await User.findById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const transactions = await Transaction.find({ userId: id }).sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  getCustomerTransactions,
};
