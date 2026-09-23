# AuThPrO

Small learning project: register, login, email cookie, middleware, protected routes.

## Run the backend
```
cd server
npm install
npm run dev
```
Edit `server/.env` if your MongoDB is not at `mongodb://127.0.0.1:27017/authpro`.
Server runs on http://localhost:5000

## Run the frontend
```
cd client
npm install
npm run dev
```
App runs on http://localhost:5173

Tailwind CSS is NOT included - set it up yourself in `client/`
and import your CSS file in `src/main.jsx` (there is a comment showing where).

## API
| Method | Endpoint             | Purpose                          |
| ------ | -------------------- | -------------------------------- |
| POST   | /api/auth/register   | Register a new user              |
| POST   | /api/auth/login      | Login, sets `email` cookie       |
| POST   | /api/auth/logout     | Clears the cookie                |
| GET    | /api/auth/me         | Current user (needs cookie)      |
