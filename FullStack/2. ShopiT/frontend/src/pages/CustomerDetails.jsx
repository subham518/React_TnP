import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCustomerById, getCustomerTransactions } from '../api/api';
import TransactionCard from '../components/TransactionCard';

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const [customerRes, transactionsRes] = await Promise.all([
          getCustomerById(id),
          getCustomerTransactions(id),
        ]);
        setCustomer(customerRes.data);
        setTransactions(transactionsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load customer details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
        Loading customer details...
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="space-y-4">
        <Link to="/customers" className="text-sm text-blue-600 hover:underline">
          &larr; Back to Customers
        </Link>
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
          {error || 'Customer not found'}
        </div>
      </div>
    );
  }

  const totalSpent = transactions.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

  return (
    <div className="space-y-6">
      <Link to="/customers" className="text-sm font-medium text-blue-600 hover:underline">
        &larr; Back to Customers
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{customer.username}</h1>
          <p className="text-sm text-gray-500 mt-1">Phone: {customer.phone}</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-xs text-gray-500 uppercase tracking-wider block">Total Spent</span>
            <span className="text-lg font-bold text-gray-900">&#8377;{totalSpent}</span>
          </div>
          <Link
            to={`/create-bill?customerId=${customer._id}`}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Bill
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Purchase History</h2>

        {transactions.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
            No transactions found for this customer.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transactions.map((tx) => (
              <TransactionCard key={tx._id} transaction={tx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
