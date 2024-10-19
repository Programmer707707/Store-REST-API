# Store REST API

This is a **Store REST API** built using **Node.js**, **Express**, **MongoDB**, and **Mongoose**. The API provides a catalog of products and supports features such as **pagination**, **sorting**, **searching**, and more. The API has been tested using **Postman** and uses a ready-made JSON dataset for the products.

## Features

- **Pagination**: Paginate through large sets of product data.
- **Sorting**: Sort products by fields such as name, price, rating, etc.
- **Filtering and Searching**: Filter products by features like company, price, name (using regex for partial matches), and more.
- **JSON Data**: The store uses pre-defined product data from a JSON file.
- **Environment Variables**: Configuration through `.env` for MongoDB connection and other environment settings.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend API.
- **Express**: Web framework for building API routes.
- **MongoDB**: NoSQL database used to store product data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB, used to interact with the database.
- **Postman**: Used for testing and interacting with the API.

## Installation

### Steps to Install:

**Clone the repository**, **install dependencies**, **create the `.env` file**, and **start the server**:

   ```bash
   git clone https://github.com/your-username/store-rest-api.git
   cd store-rest-api
   npm install

