# MovieStack - Movie Ticket Booking System

A movie ticket booking web application built with **React** and **JavaScript** (Vite).

## Features

- Browse movies with real TMDB posters, ratings, and descriptions
- User registration and login (data stored in localStorage)
- Select a showtime and screen
- Interactive seat selection grid (up to 6 seats per booking)
- Login required to book tickets
- Booking confirmation summary with user details
- Responsive dark theme with cinema-style UI

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

## Getting Started

### Step 1: Clone or navigate to the project

```bash
cd movie-booking
```

### Step 2: Install dependencies

```bash
npm install
```

This installs React, React Router, and all other required packages.

### Step 3: Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in the terminal).

### Step 4: Build for production

```bash
npm run build
```

The built files will be in the `dist/` folder, ready to be deployed.

### Step 5: Preview the production build locally

```bash
npm run preview
```

## Project Structure

```
movie-booking/
├── index.html
├── package.json
├── vite.config.js
├── public/
└── src/
    ├── main.jsx          # Entry point
    ├── App.jsx           # Main app with routing & auth provider
    ├── index.css         # Base Tailwind styles and custom theme
    ├── data.js           # Hardcoded movie data with real TMDB posters
    ├── context/
    │   └── AuthContext.jsx  # Authentication context (login/register/logout)
    └── components/
        ├── Header.jsx         # Navigation bar with auth state
        ├── MovieList.jsx      # Movie listing page
        ├── MovieDetail.jsx    # Movie details & seat selection
        ├── BookingSummary.jsx # Booking confirmation page
        └── Login.jsx          # Login & registration page
```

## Technologies Used

- **React** — UI library
- **JavaScript** — Programming language
- **Vite** — Build tool and dev server
- **React Router** — Client-side routing
- **localStorage** — User data persistence