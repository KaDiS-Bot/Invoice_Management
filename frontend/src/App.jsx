import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import InvoiceList from './components/InvoiceList';
import InvoiceForm from './components/InvoiceForm';

const App = () => {
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if the user has a saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/invoices/${id}/`);
      alert('Invoice deleted');
    } catch (error) {
      console.error('Error deleting invoice', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    // Save the user's theme preference to localStorage
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}>
        {/* <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-700 text-white rounded mb-4"
        >
          Toggle Dark Mode
        </button> */}
        <Routes>
          <Route 
            path="/" 
            element={<InvoiceList onEdit={handleEdit} onDelete={handleDelete} />} 
          />
          <Route 
            path="/invoice/:id" 
            element={<InvoiceForm invoice={editingInvoice} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
