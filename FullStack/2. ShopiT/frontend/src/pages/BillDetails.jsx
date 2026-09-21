import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTransactionById } from '../api/api';

const BillDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await getTransactionById(id);
        setTransaction(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load bill details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTransaction();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return dateString;
    return dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 bg-white rounded-lg border border-gray-200 max-w-xl mx-auto">
        Loading bill...
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="max-w-xl mx-auto space-y-4">
        <Link to="/dashboard" className="text-sm text-blue-600 hover:underline">
          &larr; Back to Dashboard
        </Link>
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
          {error || 'Bill not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <Link to="/create-bill" className="text-sm text-blue-600 hover:underline">
          &larr; Create Another Bill
        </Link>
        <Link to="/customers" className="text-sm text-gray-600 hover:underline">
          View Customers
        </Link>
      </div>

      <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-sm font-mono text-gray-800">
        <div className="text-center border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold tracking-widest text-gray-900">SHOPIT</h1>
          <p className="text-xs text-gray-500 mt-1">Mart Billing System</p>
        </div>

        <div className="py-4 border-b border-gray-200 text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">Customer:</span>
            <span className="font-semibold text-gray-900">
              {transaction.userId?.username || 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Phone:</span>
            <span>{transaction.userId?.phone || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Date:</span>
            <span>{formatDate(transaction.date)}</span>
          </div>
        </div>

        <div className="py-4">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="text-left py-2">Product</th>
                <th className="text-center py-2">Qty</th>
                <th className="text-right py-2">Price</th>
                <th className="text-right py-2">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transaction.items?.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2.5 font-medium">{item.productName}</td>
                  <td className="py-2.5 text-center">{item.quantity}</td>
                  <td className="py-2.5 text-right">&#8377;{item.price}</td>
                  <td className="py-2.5 text-right font-medium">&#8377;{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t-2 border-gray-900 pt-4 flex justify-between items-center text-base font-bold">
          <span>TOTAL</span>
          <span className="text-xl font-extrabold">&#8377;{transaction.totalAmount}</span>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          Thank you for shopping with us!
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
