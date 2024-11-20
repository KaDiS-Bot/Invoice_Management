import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import InvoiceForm from './InvoiceForm';

const InvoiceList = ({ onEdit, onDelete }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  const fetchInvoices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/invoices/?page=${page}`);
      setInvoices(response.data.results);
    } catch (err) {
      setError('Failed to fetch invoices.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [page]);

  const handleEditInvoice = (invoice) => {
    setEditingInvoice(invoice);
    setShowForm(true);
  };

  const handleAddInvoice = async (newInvoice) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/invoices/', newInvoice);
      setInvoices([response.data, ...invoices]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding invoice', error);
    }
  };

  const handleUpdateInvoice = async (updatedInvoice) => {
    if (!updatedInvoice.id) {
      console.error('Invoice ID is missing');
      return;
    }
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/invoices/${updatedInvoice.id}/`, updatedInvoice);
      setInvoices(invoices.map((invoice) => (invoice.id === response.data.id ? response.data : invoice)));
      setShowForm(false);
    } catch (error) {
      console.error('Error updating invoice', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Invoices
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setShowForm(true)} sx={{ marginBottom: 3 }}>
        Add New Invoice
      </Button>
      {showForm && (
        <InvoiceForm
          invoice={editingInvoice}
          onSubmit={editingInvoice ? handleUpdateInvoice : handleAddInvoice}
          onClose={() => setShowForm(false)}
        />
      )}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice #</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.invoice_number}</TableCell>
                  <TableCell>{invoice.customer_name}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.total_amount}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleEditInvoice(invoice)}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => onDelete(invoice.id)} sx={{ marginLeft: 1 }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button variant="outlined" onClick={() => setPage((prev) => prev + 1)}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default InvoiceList;
