import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCustomers = () => api.get('/users');
export const getCustomerById = (id) => api.get(`/users/${id}`);
export const searchCustomers = (query) => api.get(`/users/search?q=${encodeURIComponent(query)}`);
export const createCustomer = (customerData) => api.post('/users', customerData);
export const getCustomerTransactions = (id) => api.get(`/users/${id}/transactions`);

export const getTransactions = () => api.get('/transactions');
export const getTransactionById = (id) => api.get(`/transactions/${id}`);
export const createTransaction = (transactionData) => api.post('/transactions', transactionData);

export default api;
