# Divvy Backend

## Overview

Divvy is a full-stack application designed to help users manage their finances more effectively. This document provides an overview of the backend component of Divvy, which is built using Node.js and Express.js. The backend handles API routes, database operations, and authentication.

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB (v4.x or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/divvy-backend.git
   ```
2. Navigate to the project directory:
   ```
   cd divvy-backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory of the project and add the following environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
   Replace `your_mongodb_connection_string` with your MongoDB connection string and `your_jwt_secret` with a secret key for JWT authentication.

5. Start the server:
   ```
   npm start
   ```

## API Documentation

The backend provides several API endpoints for managing users, groups, and expenses. The base URL for all API requests is `http://localhost:3000/api`.

### Authentication

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Authenticate a user and return a JWT token.
- **GET /auth/verify**: Verify a user's JWT token.

### Users

- **GET /users**: Retrieve a list of all users.
- **GET /users/:id**: Retrieve a specific user by ID.
- **PUT /users/:id**: Update a specific user by ID.
- **DELETE /users/:id**: Delete a specific user by ID.

### Groups

- **GET /groups**: Retrieve a list of all groups.
- **POST /groups**: Create a new group.
- **GET /groups/:id**: Retrieve a specific group by ID.
- **PUT /groups/:id**: Update a specific group by ID.
- **DELETE /groups/:id**: Delete a specific group by ID.

### Expenses

- **GET /expenses**: Retrieve a list of all expenses.
- **POST /expenses**: Create a new expense.
- **GET /expenses/:id**: Retrieve a specific expense by ID.
- **PUT /expenses/:id**: Update a specific expense by ID.
- **DELETE /expenses/:id**: Delete a specific expense by ID.
