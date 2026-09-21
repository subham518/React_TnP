import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomers, createTransaction } from '../api/api';
import BillItem from './BillItem';

const BillForm = ({ initialCustomerId }) => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(initialCustomerId || '');
  const [customerSearch, setCustomerSearch] = useState('');

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');

  const [items, setItems] = useState([]);

  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        setLoadingCustomers(true);
        const response = await getCustomers();
        setCustomers(response.data);
      } catch (err) {
        setError('Failed to load customers');
      } finally {
        setLoadingCustomers(false);
      }
    };
    fetchCustomerList();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.username.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.phone.includes(customerSearch)
  );

  const handleAddItem = (e) => {
    e.preventDefault();
    setError('');

    if (!productName.trim()) {
      setError('Product name is required');
      return;
    }

    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setError('Please enter a valid price greater than 0');
      return;
    }

    const numQty = parseInt(quantity, 10);
    if (isNaN(numQty) || numQty <= 0) {
      setError('Please enter a valid quantity of 1 or more');
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        productName: productName.trim(),
        price: numPrice,
        quantity: numQty,
      },
    ]);

    setProductName('');
    setPrice('');
    setQuantity('1');
  };

  const handleRemoveItem = (indexToRemove) => {
    setItems((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleGenerateBill = async () => {
    setError('');

    if (!selectedCustomerId) {
      setError('Please select a customer first');
      return;
    }

    if (items.length === 0) {
      setError('Please add at least one item to generate a bill');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        userId: selectedCustomerId,
        items: items.map((item) => ({
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      const response = await createTransaction(payload);
      navigate(`/bills/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate bill');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">1. Select Customer</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Customer
            </label>
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choose Customer <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose a customer --</option>
              {filteredCustomers.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.username} ({c.phone})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">2. Add Item</h2>

        <form onSubmit={handleAddItem} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              placeholder="e.g. Rice"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (&#8377;)
            </label>
            <input
              type="number"
              min="0.01"
              step="any"
              placeholder="60"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="sm:col-span-4">
            <button
              type="submit"
              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              + Add Item
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">3. Items in Bill</h2>

        {items.length === 0 ? (
          <p className="text-sm text-gray-500 py-4 text-center">
            No items added yet. Add items above to build the bill.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-2 px-4">Product</th>
                  <th className="py-2 px-4 text-center">Qty</th>
                  <th className="py-2 px-4 text-right">Price</th>
                  <th className="py-2 px-4 text-right">Amount</th>
                  <th className="py-2 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <BillItem
                    key={idx}
                    item={item}
                    index={idx}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </tbody>
            </table>

            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center px-4">
              <span className="text-base font-bold text-gray-900">Total Amount</span>
              <span className="text-xl font-extrabold text-gray-900">&#8377;{totalAmount}</span>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="button"
            onClick={handleGenerateBill}
            disabled={submitting || items.length === 0 || !selectedCustomerId}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {submitting ? 'Generating Bill...' : 'Generate Bill'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillForm;
