# ShopiT Backend

The backend is a REST API for the ShopiT mart billing application. It accepts customer and bill requests, validates them, persists them in MongoDB, and returns JSON responses for the React frontend.

## Requirements

- Node.js 18 or newer.
- npm.
- A running MongoDB server or a MongoDB Atlas database.

## Setup

From this directory:

```bash
npm install
```

Create a `.env` file in `backend/`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/shopit
PORT=5000
```

`MONGO_URI` is required. `PORT` is optional and defaults to `5000`.

## Run the API

```bash
# Development: restarts when server files change
npm run dev

# Normal Node.js process
npm start
```

The server prints its URL after startup. The health endpoint is:

```http
GET http://localhost:5000/
```

Expected response:

```json
{ "message": "ShopiT API is running" }
```

## Project Structure

```text
backend/
  app.js                         Express app, middleware, routes, errors
  server.js                      Environment loading, database connection, startup
  config/db.js                   Mongoose connection helper
  controllers/
    userController.js            Customer validation and queries
    transactionController.js     Bill validation, totals, and queries
  middleware/errorMiddleware.js  404 and JSON error responses
  models/
    User.js                      Customer schema
    Transaction.js                Bill and item schemas
  routes/
    userRoutes.js                /api/users endpoints
    transactionRoutes.js          /api/transactions endpoints
```

`server.js` starts the process and connects to MongoDB. `app.js` configures Express and can be imported independently for testing.

## Data Model

### User

```json
{
  "_id": "ObjectId",
  "username": "Rahul",
  "phone": "9876543210",
  "createdAt": "date",
  "updatedAt": "date"
}
```

The phone field is unique. The controller also requires exactly 10 digits before creating a customer.

### Transaction

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "items": [
    {
      "productName": "Rice",
      "price": 60,
      "quantity": 2,
      "amount": 120
    }
  ],
  "totalAmount": 120,
  "date": "2026-09-17",
  "createdAt": "date",
  "updatedAt": "date"
}
```

`amount` and `totalAmount` are calculated by the API. The optional request `date` is stored as a `YYYY-MM-DD` string; when it is omitted, the server uses the current date.

## API Reference

All application endpoints are prefixed with `/api`.

### Customers

#### `POST /api/users`

Creates a customer.

```json
{
  "username": "Rahul",
  "phone": "9876543210"
}
```

Returns `201` with the created customer. Returns `400` for missing or invalid fields and `409` when the phone already exists.

#### `GET /api/users`

Returns all customers, newest first.

#### `GET /api/users/search?q=rahul`

Searches `username` and `phone` case-insensitively. An empty search term returns an empty array.

#### `GET /api/users/:id`

Returns one customer or `404` when the ID is invalid or not found.

#### `GET /api/users/:id/transactions`

Returns all bills belonging to a customer, newest first.

### Transactions

#### `POST /api/transactions`

Creates a bill for an existing customer.

```json
{
  "userId": "66b000000000000000000001",
  "items": [
    {
      "productName": "Rice",
      "price": 60,
      "quantity": 2
    },
    {
      "productName": "Oil",
      "price": 120,
      "quantity": 1
    }
  ]
}
```

The response contains the saved transaction with `userId` populated with the customer's `username` and `phone`. The endpoint rejects an invalid customer ID, an unknown customer, an empty item list, an empty product name, a non-positive price, or a non-positive quantity.

#### `GET /api/transactions`

Returns all bills with customer details populated, newest first.

#### `GET /api/transactions/:id`

Returns one bill with customer details populated or `404` when it does not exist.

## Error Responses

Errors use this shape:

```json
{ "message": "Customer not found" }
```

The error middleware handles unknown routes with `404`, duplicate MongoDB keys with `409`, invalid MongoDB object IDs with `404`, and unexpected failures with `500`.

## Connecting the Frontend

The frontend uses `http://localhost:5000/api` by default. Set `VITE_API_URL` in `frontend/.env` when the API is hosted elsewhere. CORS is enabled in `app.js` so the local Vite origin can call the API.

## Current Scope

This API has no authentication, authorization, pagination, update endpoints, delete endpoints, inventory management, or automated tests yet. Add those features before exposing it to an untrusted or production environment.