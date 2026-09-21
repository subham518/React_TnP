const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
} = require('../controllers/transactionController');

router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);

module.exports = router;
