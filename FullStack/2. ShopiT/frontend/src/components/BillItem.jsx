import React from 'react';

const BillItem = ({ item, index, onRemove }) => {
  const itemAmount = item.price * item.quantity;

  return (
    <tr className="border-b border-gray-100 text-sm">
      <td className="py-3 px-4 font-medium text-gray-900">{item.productName}</td>
      <td className="py-3 px-4 text-center text-gray-700">{item.quantity}</td>
      <td className="py-3 px-4 text-right text-gray-700">&#8377;{item.price}</td>
      <td className="py-3 px-4 text-right font-medium text-gray-900">&#8377;{itemAmount}</td>
      <td className="py-3 px-4 text-center">
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700 font-medium text-xs hover:underline"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default BillItem;
