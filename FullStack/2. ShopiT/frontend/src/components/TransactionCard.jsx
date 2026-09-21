import React from 'react';
import { Link } from 'react-router-dom';

const TransactionCard = ({ transaction }) => {
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

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</span>
          <p className="text-sm font-medium text-gray-900">{formatDate(transaction.date)}</p>
        </div>
        <Link
          to={`/bills/${transaction._id}`}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline"
        >
          View Full Bill &rarr;
        </Link>
      </div>

      <div className="space-y-2">
        {transaction.items?.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-800">{item.productName}</span>
            <span className="text-gray-500">
              {item.quantity} &times; &#8377;{item.price}
            </span>
            <span className="font-medium text-gray-900">&#8377;{item.amount}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center border-t border-gray-100 pt-3 text-sm">
        <span className="font-semibold text-gray-900">Total</span>
        <span className="font-bold text-gray-900 text-base">&#8377;{transaction.totalAmount}</span>
      </div>
    </div>
  );
};

export default TransactionCard;
