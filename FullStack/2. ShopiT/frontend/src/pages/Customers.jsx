import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCustomers, searchCustomers } from '../api/api';
import CustomerForm from '../components/CustomerForm';
import CustomerSearch from '../components/CustomerSearch';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      fetchCustomers();
      return;
    }

    try {
      setLoading(true);
      const response = await searchCustomers(term);
      setCustomers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCustomerAdded = (newCustomer) => {
    setCustomers((prev) => [newCustomer, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <CustomerForm onCustomerAdded={handleCustomerAdded} />
        </div>

        <div className="md:col-span-2 space-y-4">
          <CustomerSearch searchTerm={searchTerm} onSearchChange={handleSearch} />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          {loading ? (
            <div className="p-8 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
              Loading customers...
            </div>
          ) : customers.length === 0 ? (
            <div className="p-8 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
              {searchTerm ? 'No customers found matching your search.' : 'No customers added yet.'}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200 shadow-sm overflow-hidden">
              {customers.map((customer) => (
                <div
                  key={customer._id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition-colors gap-3"
                >
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{customer.username}</h3>
                    <p className="text-sm text-gray-500">{customer.phone}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link
                      to={`/customers/${customer._id}`}
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      History
                    </Link>
                    <Link
                      to={`/create-bill?customerId=${customer._id}`}
                      className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                    >
                      Create Bill
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
