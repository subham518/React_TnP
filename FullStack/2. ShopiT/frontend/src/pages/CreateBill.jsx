import React from 'react';
import { useSearchParams } from 'react-router-dom';
import BillForm from '../components/BillForm';

const CreateBill = () => {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get('customerId') || '';

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create Bill</h1>
        <p className="text-sm text-gray-500 mt-1">
          Select a customer, add products, and generate the bill.
        </p>
      </div>

      <BillForm initialCustomerId={customerId} />
    </div>
  );
};

export default CreateBill;
