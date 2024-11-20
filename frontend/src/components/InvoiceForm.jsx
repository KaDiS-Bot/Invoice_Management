import React, { useState, useEffect } from 'react';

const InvoiceForm = ({ invoice, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    invoice_number: '',
    customer_name: '',
    date: '',
    details: [{ description: '', quantity: 1, unit_price: 0.00 }],
    id: null,
  });

  useEffect(() => {
    if (invoice) {
      setFormData({
        invoice_number: invoice.invoice_number,
        customer_name: invoice.customer_name,
        date: invoice.date,
        details: invoice.details.map(detail => ({
          description: detail.description,
          quantity: detail.quantity,
          unit_price: detail.unit_price,
        })),
        id: invoice.id,
      });
    }
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;

    if (dataset.index !== undefined) {
      const updatedDetails = [...formData.details];
      updatedDetails[dataset.index][name] = value;
      setFormData({ ...formData, details: updatedDetails });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id) {
      console.log('Creating new invoice:', formData);
    }
    onSubmit(formData);
  };

  const addDetail = () => {
    setFormData({
      ...formData,
      details: [...formData.details, { description: '', quantity: 1, unit_price: 0.00 }],
    });
  };

  const removeDetail = (index) => {
    const updatedDetails = [...formData.details];
    updatedDetails.splice(index, 1);
    setFormData({ ...formData, details: updatedDetails });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">
        {invoice ? 'Edit Invoice' : 'Create Invoice'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="invoice_number" className="block text-lg font-medium text-gray-700">Invoice Number</label>
            <input
              type="text"
              name="invoice_number"
              value={formData.invoice_number}
              onChange={handleChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="customer_name" className="block text-lg font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-lg font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {formData.details.map((detail, index) => (
          <div key={index} className="mt-6 p-4 bg-gray-100 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor={`description-${index}`} className="block text-lg font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  data-index={index}
                  value={detail.description}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor={`quantity-${index}`} className="block text-lg font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  data-index={index}
                  value={detail.quantity}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor={`unit_price-${index}`} className="block text-lg font-medium text-gray-700">Unit Price</label>
                <input
                  type="number"
                  name="unit_price"
                  data-index={index}
                  value={detail.unit_price}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col items-center justify-between">
                <button
                  type="button"
                  onClick={() => removeDetail(index)}
                  className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove Detail
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={addDetail}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Detail
          </button>
          <div>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-lg mr-4 hover:bg-green-600"
            >
              {invoice ? 'Update Invoice' : 'Create Invoice'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
