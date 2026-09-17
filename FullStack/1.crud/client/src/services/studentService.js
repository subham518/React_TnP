// Base API URL for student endpoints
// Uses relative path so Vite proxy (or same-origin server) forwards it to the backend
const API_BASE = '/api/students';

/**
 * Fetch all students from the database
 */
export async function getAllStudents() {
  const response = await fetch(API_BASE);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch students');
  }
  return data.data; // array of student objects
}

/**
 * Fetch a single student by MongoDB ID
 */
export async function getStudentById(id) {
  const response = await fetch(`${API_BASE}/${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch student details');
  }
  return data.data;
}

/**
 * Create/Add a new student
 * @param {Object} student - { name, rollNo, course, age }
 */
export async function createStudent(student) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to add student');
  }
  return data.data;
}

/**
 * Update an existing student by ID
 * @param {string} id - MongoDB ObjectId
 * @param {Object} student - Updated fields { name, rollNo, course, age }
 */
export async function updateStudent(id, student) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update student');
  }
  return data.data;
}

/**
 * Delete a student by ID
 * @param {string} id - MongoDB ObjectId
 */
export async function deleteStudent(id) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete student');
  }
  return data;
}
