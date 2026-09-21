const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getCustomers,
  searchCustomers,
  getCustomerById,
} = require('../controllers/userController');
const { getCustomerTransactions } = require('../controllers/transactionController');

router.post('/', createCustomer);
router.get('/', getCustomers);
router.get('/search', searchCustomers);
router.get('/:id/transactions', getCustomerTransactions);
router.get('/:id', getCustomerById);

module.exports = router;
