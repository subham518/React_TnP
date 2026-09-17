# Student CRUD Application (MERN Stack)

A beginner-friendly, clean, and complete Student Management CRUD application built with the **MERN** stack:
- **M**ongoDB: Database for storing student records
- **E**xpress.js: Web server framework for Node.js
- **R**eact: Modern interactive user interface (built with Vite)
- **N**ode.js: JavaScript runtime environment

---

## 📁 Project Structure

```text
1.crud/
├── server/                    # Backend API (Node + Express + MongoDB)
│   ├── models/
│   │   ├── Student.js         # Mongoose schema for Student
│   │   └── Item.js            # Generic item model (reference)
│   ├── routes/
│   │   ├── studentRoutes.js   # Student CRUD REST API endpoints
│   │   └── itemRoutes.js      # Generic item routes
│   ├── .env                   # Environment variables (PORT, MONGO_URI)
│   ├── package.json           # Server dependencies & scripts
│   ├── server.js              # Express app entry point & MongoDB connection
│   └── verify-students.js     # Automated CRUD test script
│
├── client/                    # Frontend UI (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentForm.jsx    # Add / Edit student form
│   │   │   └── StudentList.jsx    # Student directory table & search
│   │   ├── services/
│   │   │   └── studentService.js  # API helper methods (fetch)
│   │   ├── App.jsx            # Main app state & CRUD handlers
│   │   ├── App.css            # Component styles
│   │   ├── index.css          # Global resets & typography
│   │   └── main.jsx           # React DOM entry point
│   ├── index.html
│   ├── package.json           # Client dependencies & scripts
│   └── vite.config.js         # Vite configuration with backend proxy
│
└── README.md                  # Documentation
```

---

## 🧑‍🎓 Student Data Model

Each student document contains the following fields:

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Student's full name (2–100 characters) |
| `rollNo` | String | Yes | Unique identifier (e.g. `CS2026-001`) |
| `course` | String | Yes | Degree/Course name (e.g. `Computer Science`) |
| `age` | Number | Yes | Positive integer (1–120) |
| `createdAt` | Date | Auto | Timestamp when record was created |
| `updatedAt` | Date | Auto | Timestamp when record was last updated |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) running locally on `mongodb://127.0.0.1:27017` (or provide your MongoDB Atlas connection string in `server/.env`)

---

### 1. Backend Setup (`server`)

Open a terminal and navigate to the `server` directory:

```bash
cd server
npm install
```

Start the backend server:

```bash
# Production mode:
npm start

# Development mode (auto-reload on save):
npm run dev
```

The backend server will run on **`http://localhost:5000`**.

#### Run Automated CRUD Tests:
To test and verify all REST API endpoints against your MongoDB database:

```bash
node verify-students.js
```

---

### 2. Frontend Setup (`client`)

Open a second terminal and navigate to the `client` directory:

```bash
cd client
npm install
npm run dev
```

The React frontend will run on **`http://localhost:5173`**.

---

## 📡 REST API Endpoints

All student endpoints are prefixed with `/api/students`:

| Method | Endpoint | Description | Request Body Example |
|---|---|---|---|
| **POST** | `/api/students` | Add a new student | `{"name":"Aarav Sharma","rollNo":"CS101","course":"Computer Science","age":20}` |
| **GET** | `/api/students` | Get all students | _None_ |
| **GET** | `/api/students/:id` | Get single student by ID | _None_ |
| **PUT** | `/api/students/:id` | Update student details | `{"course":"Data Science","age":21}` |
| **DELETE** | `/api/students/:id` | Delete student by ID | _None_ |

### Example API Responses

#### Successful Creation (`POST /api/students`):
```json
{
  "success": true,
  "message": "Student added successfully",
  "data": {
    "_id": "6aaa83049dbbc810ca9db650",
    "name": "Aarav Sharma",
    "rollNo": "CS101",
    "course": "Computer Science",
    "age": 20,
    "createdAt": "2026-09-16T11:52:36.498Z",
    "updatedAt": "2026-09-16T11:52:36.498Z",
    "__v": 0
  }
}
```

#### Validation / Duplicate Roll No Error (`400 Bad Request`):
```json
{
  "success": false,
  "message": "Roll number 'CS101' already exists. Roll numbers must be unique."
}
```

---

## 💡 Key Features
- **Full CRUD Operations**: Create, Read, Update, and Delete students.
- **Form Auto-fill for Editing**: Clicking "Edit" pre-fills the form with existing student details for seamless updating with an optional "Cancel Edit" button.
- **Search & Filter**: Real-time search bar to quickly find students by name, roll number, or course.
- **Responsive & Clean UI**: Minimal modern CSS with card layouts, responsive table, and status alerts.
- **Input Validation**: Backend Mongoose validation + frontend validation preventing blank submissions and duplicate roll numbers.
- **CORS & Proxy Setup**: Configured Vite proxy to avoid CORS friction in local development.
