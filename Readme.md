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

The backend provides several API endpoints for managing users, groups, and expenses. The base URL for all API requests is `http://localhost:3000`.

### Authentication

- **POST /auth/signup**: Register a new user.
- **POST /auth/login**: Authenticate a user and return a JWT token.
- **GET /auth/verify**: Verify a user's JWT token.
- **GET /auth/users/search**: Search for users by email.

### Groups

- **GET /api/groups/user**: Retrieve all groups of the authenticated user.
- **POST /api/groups**: Create a new group.
- **GET /api/groups/:groupId**: Retrieve a specific group by ID.
- **PUT /api/groups/:groupId**: Update a specific group by ID.
- **DELETE /api/groups/:groupId**: Delete a specific group by ID.

### Expenses

- **GET /api/expenses/user**: Retrieve all expenses of the authenticated user.
- **POST /api/expenses**: Create a new expense.
- **GET /api/expenses/:expenseId**: Retrieve a specific expense by ID.
- **PUT /api/expenses/:expenseId**: Update a specific expense by ID.
- **DELETE /api/expenses/:expenseId**: Delete a specific expense by ID.
- **GET /api/expenses/group/:groupId**: Retrieve all expenses of a specific group by ID.

Please note that all routes that require authentication should include a valid JWT token in the `Authorization` header of the request.