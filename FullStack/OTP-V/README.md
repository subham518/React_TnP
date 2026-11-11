# OTP-V

OTP-V is a beginner-friendly full-stack web application that demonstrates a
complete email-OTP based authentication system, built with the MERN stack
(MongoDB, Express, React, Node.js).

It is meant as a learning project, so the code favors clarity over cleverness.

---

## Features

- User registration (with hashed passwords)
- Login with email + password, followed by a 6-digit email OTP
- OTP expiry (1 minute), resend (30 second cooldown), and attempt limiting (5 tries)
- Cookie-based login sessions (no JWT)
- Protected profile/details page
- Change password (requires OTP confirmation before the change is saved)
- Forgot password (requires OTP confirmation before setting a new password)
- Logout
- Emails sent using Nodemailer
- Data stored in MongoDB using Mongoose

---

## Technology Stack

**Frontend:** React, Vite, Axios, React Router, Tailwind CSS (utility classes only)

**Backend:** Node.js, Express.js, MongoDB, Mongoose, Nodemailer, bcryptjs,
cookie-parser, dotenv, CORS

**Authentication:** Simple cookie-based sessions (the user's email is stored
in an `httpOnly` cookie after successful login). This project intentionally
does **not** use JWT, OAuth, or Redis, to keep things beginner-friendly.

> Note: Tailwind CSS itself (installation/config/PostCSS) is **not** set up
> by this project - only Tailwind utility classes are used inside the React
> components. You are expected to configure Tailwind separately.

---

## Folder Structure

```text
OTP-V/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── authApi.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── OtpInput.jsx
│   │   │   └── Loading.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── VerifyOtp.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── Details.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── config/db.js
│   ├── controllers/authController.js
│   ├── middleware/authMiddleware.js
│   ├── models/User.js
│   ├── models/OTP.js
│   ├── routes/authRoutes.js
│   ├── utils/generateOtp.js
│   ├── utils/sendEmail.js
│   ├── .env.example
│   └── server.js
│
├── .gitignore
└── README.md
```

---

## How to Install

1. Extract the ZIP file.
2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

---

## How to Configure MongoDB

You need a MongoDB connection string. You can either:

- Run MongoDB locally (e.g. `mongodb://127.0.0.1:27017/otp-v`), or
- Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas) and
  copy the connection string it gives you.

Put this connection string in `backend/.env` as `MONGO_URI`.

---

## How to Configure Email

This project uses Nodemailer with Gmail by default.

1. Use (or create) a Gmail account for sending OTP emails.
2. Turn on 2-Step Verification on that Google account.
3. Create an **App Password** (Google Account → Security → App passwords).
4. Put the Gmail address in `EMAIL_USER` and the App Password in
   `EMAIL_PASSWORD` in `backend/.env`.

(If you'd rather use a different email provider, you can change the
`service` option in `backend/utils/sendEmail.js`.)

---

## Environment Variables

Copy the example file and fill in your own values:

```bash
cd backend
cp .env.example .env
```

`backend/.env.example`:

```env
PORT=5000
MONGO_URI=
EMAIL_USER=
EMAIL_PASSWORD=
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Never commit your real `.env` file.

---

## How to Run Backend

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000` (or whatever `PORT` you set).

---

## How to Run Frontend

In a separate terminal:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`.

Open that URL in your browser to use the app.

---

## Authentication Flow

1. User registers with name, email, and password (password is hashed with bcrypt).
2. User logs in with email + password.
3. If credentials are correct, a 6-digit OTP is generated, stored in MongoDB,
   and emailed to the user.
4. User enters the OTP on the verification page.
5. If the OTP is correct and not expired, the backend sets an `httpOnly`
   cookie containing the user's email - this is the user's login session.
6. Protected routes (like `/api/auth/me`) read this cookie to identify the
   logged-in user.
7. Logout clears the cookie.

## OTP Flow

- Every OTP is 6 digits and expires after **1 minute**.
- A maximum of **5** incorrect attempts are allowed per OTP.
- Requesting a new OTP invalidates the previous one.
- Resending an OTP has a **30 second** cooldown, enforced by both the
  frontend and the backend.
- Every OTP is tagged with a `purpose` (`LOGIN`, `CHANGE_PASSWORD`, or
  `FORGOT_PASSWORD`) so an OTP generated for one action can't be reused for
  another.
- For **Change Password**, the new (hashed) password is only stored
  temporarily and only becomes permanent once the OTP is verified.
- For **Forgot Password**, the new password is only accepted after the OTP
  for that email has been successfully verified.
