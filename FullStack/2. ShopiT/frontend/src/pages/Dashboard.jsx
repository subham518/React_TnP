import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCustomers, getTransactions } from '../api/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalBills: 0,
    todayTransactions: 0,
    todaySales: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');

        const [customersRes, transactionsRes] = await Promise.all([
          getCustomers(),
          getTransactions(),
        ]);

        const customers = customersRes.data || [];
        const transactions = transactionsRes.data || [];

        const todayStr = new Date().toISOString().split('T')[0];

        const todayTxs = transactions.filter((t) => t.date === todayStr);
        const todaySalesAmount = todayTxs.reduce(
          (sum, t) => sum + (Number(t.totalAmount) || 0),
          0
        );

        setStats({
          totalCustomers: customers.length,
          totalBills: transactions.length,
          todayTransactions: todayTxs.length,
          todaySales: todaySalesAmount,
        });

        setRecentTransactions(transactions.slice(0, 5));
      } catch (err) {
        setError('Failed to load dashboard metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return dateString;
    return dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ShopiT Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of your mart's daily billing activity.</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/customers"
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            Customers
          </Link>
          <Link
            to="/create-bill"
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            + Create New Bill
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Total Customers
          </span>
          <span className="text-2xl font-extrabold text-gray-900 mt-2 block">
            {stats.totalCustomers}
          </span>
        </div>

        <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Total Bills
          </span>
          <span className="text-2xl font-extrabold text-gray-900 mt-2 block">
            {stats.totalBills}
          </span>
        </div>

        <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Today's Transactions
          </span>
          <span className="text-2xl font-extrabold text-gray-900 mt-2 block">
            {stats.todayTransactions}
          </span>
        </div>

        <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            Today's Sales
          </span>
          <span className="text-2xl font-extrabold text-blue-600 mt-2 block">
            &#8377;{stats.todaySales}
          </span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-900">Recent Transactions</h2>
          <span className="text-xs text-gray-500">Showing latest {recentTransactions.length} bills</span>
        </div>

        {recentTransactions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No transactions found. Click <strong>Create New Bill</strong> to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4 text-center">Items</th>
                  <th className="py-3 px-4 text-right">Total</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTransactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-gray-600">{formatDate(tx.date)}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {tx.userId?.username || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-gray-500">{tx.userId?.phone || 'N/A'}</td>
                    <td className="py-3 px-4 text-center text-gray-600">
                      {tx.items?.length || 0}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900">
                      &#8377;{tx.totalAmount}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Link
                        to={`/bills/${tx._id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline text-xs"
                      >
                        View Bill
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
