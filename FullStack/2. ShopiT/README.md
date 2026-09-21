# ShopiT

ShopiT is a full-stack mart billing system. It lets a shop operator register customers, search customer records, create itemized bills, review purchase history, and monitor basic sales activity from a dashboard.

## What Is Included

- `backend/`: Node.js and Express REST API backed by MongoDB.
- `frontend/`: React single-page application built with Vite and styled with Tailwind CSS.
- `backend/README.md`: backend setup, data model, API reference, and troubleshooting.
- `frontend/README.md`: frontend setup, routes, user workflow, and configuration.

## Technology Stack

| Layer | Technology |
| --- | --- |
| Client | React 18, React Router 6, Axios |
| Client tooling | Vite, Tailwind CSS 4 |
| Server | Node.js, Express 4 |
| Database | MongoDB with Mongoose 8 |
| Configuration | `.env` files and Vite environment variables |

## Application Flow

1. The operator opens the React frontend.
2. The frontend calls the Express API through Axios.
3. Express validates requests and passes them to the relevant controller.
4. Controllers read or write `User` and `Transaction` documents in MongoDB.
5. The API returns JSON, and React updates the dashboard, customer pages, or bill view.

When a bill is created, the backend verifies the customer and every item, calculates each item amount as `price * quantity`, calculates the total, stores the transaction, and returns the populated bill.

## Prerequisites

- Node.js 18 or newer and npm.
- A running MongoDB instance, either local or hosted.
- Two terminal windows if running the frontend and backend separately.

## Run Locally

### 1. Configure the backend

Create `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/shopit
PORT=5000
```

For MongoDB Atlas, replace `MONGO_URI` with the Atlas connection string.

### 2. Install and start the backend

```bash
cd backend
npm install
npm run dev
```

The API runs at `http://localhost:5000`. Use `npm start` for a normal Node.js process without nodemon.

### 3. Install and start the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

The frontend defaults to `http://localhost:5000/api`. To use another API URL, create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Restart Vite after changing environment variables.

## Main UI Routes

| Route | Purpose |
| --- | --- |
| `/dashboard` | Shows customer count, bill count, today's transactions, today's sales, and recent bills. |
| `/customers` | Adds customers and searches the customer list by name or phone. |
| `/customers/:id` | Shows one customer's details and purchase history. |
| `/create-bill` | Selects a customer and builds a bill from one or more items. |
| `/bills/:id` | Displays the generated receipt and its itemized totals. |

The root route redirects to `/dashboard`.

## API Summary

The API is available under `/api`:

- `GET /api/users` - list customers.
- `POST /api/users` - create a customer.
- `GET /api/users/search?q=term` - search by username or phone.
- `GET /api/users/:id` - get one customer.
- `GET /api/users/:id/transactions` - get a customer's bills.
- `GET /api/transactions` - list all bills.
- `POST /api/transactions` - create a bill.
- `GET /api/transactions/:id` - get one bill.

See [backend/README.md](backend/README.md) for request examples and validation behavior.

## Important Design Notes

- There is currently no authentication or authorization layer. Anyone who can reach the API can use its endpoints.
- Customer phone numbers must be unique and exactly 10 digits.
- A transaction must contain at least one item, and price and quantity must be greater than zero.
- The backend is the source of truth for transaction totals; the frontend total is only a live preview while building a bill.
- CORS is enabled globally by the Express app for local frontend development.
- Data is stored in MongoDB and is not available if the database connection fails.

## Useful Commands

```bash
# Backend development server
cd backend && npm run dev

# Backend production-style start
cd backend && npm start

# Frontend development server
cd frontend && npm run dev

# Frontend production build
cd frontend && npm run build

# Preview the frontend production build
cd frontend && npm run preview
```

## Further Reading

- [Backend documentation](backend/README.md)
- [Frontend documentation](frontend/README.md)