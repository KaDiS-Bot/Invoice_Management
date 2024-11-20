# Invoice Management System

## Overview
This is an Invoice Management System built using **React** for the frontend and **Django** for the backend. The app allows users to create, edit, view, and delete invoices. It includes features such as invoice creation, customer information management, and pagination for easy navigation through the list of invoices.

## Features

- **View Invoices**: Displays a paginated list of invoices with their respective details such as invoice number, customer name, date, and total amount.
- **Add New Invoice**: Allows users to create new invoices with customer details, invoice number, and items list.
- **Edit Invoice**: Enables users to modify details of existing invoices.
- **Delete Invoice**: Users can delete invoices from the list.
- **Pagination**: Navigate through multiple pages of invoices for easy browsing.

## Tech Stack

- **Frontend**: 
  - React
  - Material-UI
  - Tailwind CSS
  - Axios (for API requests)
  
- **Backend**:
  - Django (with Django REST Framework for API)
  - SQLite (or any preferred database)

## Getting Started

### Prerequisites

- **Node.js** (for frontend)
- **Python 3.x** (for backend)
- **Django** (with Django REST Framework)
- **SQLite** (or any other database)

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/invoice-management-system.git
   cd invoice-management-system
   ```

2. Install the required dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   This will start the frontend on `http://localhost:5173`.

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   ```

3. Install the required Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations to set up the database:

   ```bash
   python manage.py migrate
   ```

5. Create a superuser to manage the Django admin:

   ```bash
   python manage.py createsuperuser
   ```

6. Run the Django server:

   ```bash
   python manage.py runserver
   ```

   This will start the backend server on `http://127.0.0.1:8000`.

### API Endpoints

- **GET** `/api/invoices/`: Fetch all invoices with pagination.
- **POST** `/api/invoices/`: Create a new invoice.
- **PUT** `/api/invoices/{id}/`: Update an existing invoice.
- **DELETE** `/api/invoices/{id}/`: Delete an invoice.

## Usage

1. Visit `http://localhost:5173` to interact with the frontend.
2. You can add new invoices, edit existing ones, and delete them.
3. Pagination allows you to browse through a large list of invoices.

## File Structure

```bash
invoice-management-system/
├── backend/
│   ├── manage.py
│   ├── invoice_management/
│   ├── invoices/
│   └── requirements.txt
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── tailwind.config.js
```

## Contributing

1. Fork this repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).
