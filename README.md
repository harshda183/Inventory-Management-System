Inventory and Data Management System

Assignment 3 – Web Development III

A backend-based Inventory and Data Management System developed using Node.js, Express.js, MongoDB, and Mongoose. This project provides RESTful APIs to manage product information, monitor stock levels, search and filter products, and generate inventory reports.

Project Overview

The Inventory Management System helps stores and warehouses maintain their product catalogues efficiently. It supports essential inventory operations such as adding new products, updating product details, managing stock, deleting products, and generating inventory summaries.

The application uses MongoDB for persistent data storage and Mongoose for schema design and validation.

Technologies Used

- Node.js – JavaScript runtime environment.
- Express.js – Backend framework for building REST APIs.
- MongoDB – NoSQL database for storing product information.
- Mongoose – ODM for database operations and schema validation.
- dotenv – Managing environment variables.

Features

- Create and add new products.
- Retrieve all available products.
- Search products by name.
- Filter products by category and price.
- Sort products based on selected fields.
- Implement pagination for product listings.
- Retrieve individual product details using ID.
- Update product information and stock quantities.
- Delete products from the inventory.
- Restock products and record sales.
- Generate low-stock alerts.
- Generate category-wise inventory summaries using MongoDB aggregation.
- Validate product data using Mongoose.
- Handle errors through centralized error-handling middleware.

Project Structure

inventory-management-system/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── productController.js
│
├── middleware/
│   └── errorMiddleware.js
│
├── models/
│   └── Product.js
│
├── routes/
│   └── productRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md

Installation and Setup

1. Clone the Repository

git clone <your-github-repository-link>

2. Navigate to the Project Folder

cd inventory-management-system

3. Install Dependencies

npm install

4. Configure Environment Variables

Create a ".env" file in the root directory.

PORT=5000
MONGO_URI=your_mongodb_connection_string

5. Start the Server

npm start

For development:

npm run dev

The server will run at:

http://localhost:5000

API Endpoints

Method| Endpoint| Description
POST| "/api/products"| Create a new product
GET| "/api/products"| Get all products
GET| "/api/products/:id"| Get product by ID
PUT| "/api/products/:id"| Update product
DELETE| "/api/products/:id"| Delete product
PATCH| "/api/products/:id/restock"| Increase stock
PATCH| "/api/products/:id/sale"| Decrease stock
GET| "/api/products/low-stock"| Get low-stock products
GET| "/api/products/summary"| Category-wise inventory summary

Query Parameters

The product listing API supports filtering, sorting, and pagination.

Example:

GET /api/products?category=Electronics

GET /api/products?sortBy=price&order=asc

GET /api/products?page=1&limit=10

These parameters help retrieve specific products and organize inventory records efficiently.

Database and Validation

The Product schema uses Mongoose to define and validate product information.

Typical product fields include:

- Product Name
- Description
- Category
- Price
- Quantity
- Stock Threshold

Validation ensures that the stored product information follows the defined schema rules.

Inventory Reports

1. Low-Stock Report

Identifies products whose available quantity is below the specified stock threshold.

2. Category-Wise Inventory Summary

Uses MongoDB aggregation pipelines to summarize inventory information category-wise.

Testing

The REST API endpoints can be tested using Postman or Thunder Client.

Testing includes:

- Creating products.
- Retrieving product records.
- Updating product details.
- Deleting products.
- Filtering, sorting, and pagination.
- Restocking and recording sales.
- Generating inventory reports.
- Checking validation and error responses.

Learning Outcomes

Through this assignment, the following concepts were implemented and practised:

- Mongoose schema design and field-level validation.
- MongoDB database connectivity.
- RESTful API development using Express.js.
- CRUD operations.
- Query parameters and pagination.
- MongoDB aggregation pipelines.
- Middleware and centralized error handling.
- Environment variable configuration using dotenv.

Conclusion

The Inventory and Data Management System demonstrates the practical implementation of backend development concepts using Node.js, Express.js, and MongoDB. It provides an organized way to manage product records, maintain stock levels, and generate useful inventory reports through RESTful APIs.

This project helped strengthen practical knowledge of database integration, API development, data validation, and inventory management operations.

---

Course: Web Development III
Assignment: Assignment 3 – Inventory and Data Management System
Technology: Node.js, Express.js, MongoDB, Mongoose