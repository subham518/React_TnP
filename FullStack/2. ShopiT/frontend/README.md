# ShopiT Frontend

The frontend is a React single-page application for operating the ShopiT billing system. It provides the dashboard, customer directory, customer history, bill builder, and printable-style bill details view.

## Requirements

- Node.js 18 or newer.
- npm.
- The ShopiT backend running, unless `VITE_API_URL` points to another API.

## Setup and Run

Install dependencies:

```bash
npm install
```

The API client defaults to:

```text
http://localhost:5000/api
```

To override it, create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`. The backend should be running separately on port `5000`.

## Available Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts Vite in development mode with hot reload. |
| `npm run build` | Creates the production bundle in `dist/`. |
| `npm run preview` | Serves the production bundle locally for verification. |

## Project Structure

```text
frontend/
  index.html                    Vite HTML entry point
  vite.config.js                Vite, React, and Tailwind configuration
  src/
    main.jsx                    React root and BrowserRouter setup
    App.jsx                     Application route definitions
    index.css                   Tailwind import and global body styles
    api/api.js                  Axios instance and API functions
    layouts/MainLayout.jsx      Shared navbar and page container
    components/                 Reusable forms, lists, and bill UI
    pages/                      Route-level screens
```

## Application Routes

| Route | Screen | Behavior |
| --- | --- | --- |
| `/` | Redirect | Redirects to `/dashboard`. |
| `/dashboard` | Dashboard | Loads customers and transactions, then derives summary metrics and recent bills. |
| `/customers` | Customers | Adds customers, searches by name or phone, and links to history or bill creation. |
| `/customers/:id` | Customer details | Loads the customer and their transactions and calculates total spending. |
| `/create-bill` | Create bill | Selects a customer, adds products, previews totals, and submits a transaction. |
| `/bills/:id` | Bill details | Loads one transaction and renders its customer, items, date, and total. |

## Typical User Workflow

1. Open **Customers** and add a name plus a unique 10-digit phone number.
2. Search for the customer if needed.
3. Choose **Create Bill** from the customer list or open **Create Bill** directly.
4. Select the customer, enter a product name, price, and quantity, then add the item.
5. Add more items or remove an item from the draft.
6. Choose **Generate Bill**. The API validates and saves the transaction.
7. Review the receipt on `/bills/:id` or view it later from the dashboard or customer history.

## API Layer

`src/api/api.js` creates one Axios client and exports the operations used by the screens:

- Customer reads: `getCustomers`, `getCustomerById`, `searchCustomers`, `getCustomerTransactions`.
- Customer write: `createCustomer`.
- Transaction reads: `getTransactions`, `getTransactionById`.
- Transaction write: `createTransaction`.

The client sends JSON and reads `VITE_API_URL` through Vite's `import.meta.env` support. API errors are displayed using the server's `message` field when it is available.

## Validation and State

- Customer creation requires a non-empty name and exactly 10 digits for the phone.
- Bill creation requires a selected customer and at least one item.
- Each item requires a name, a price greater than zero, and a quantity of at least one.
- The bill form calculates a live preview total in the browser, but the backend recalculates the authoritative amounts before saving.
- Screens show loading states while requests are in progress and inline error states when requests fail.

## Styling

Tailwind CSS is loaded through `@tailwindcss/vite` in `vite.config.js`. Most presentation is expressed with utility classes in JSX. `src/index.css` imports Tailwind and defines the global body defaults.

## Production Build

Build and preview the application with:

```bash
npm run build
npm run preview
```

For deployment, configure `VITE_API_URL` to the deployed API before running the build. Vite environment values are embedded at build time, so changing the server URL requires a new build.

## Current Scope

The client currently has no login flow, route guards, offline mode, automated tests, bill editing, or bill deletion. It assumes the API is reachable and that the API's CORS configuration permits the frontend origin.