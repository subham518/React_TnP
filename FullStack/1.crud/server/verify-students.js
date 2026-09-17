const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crud_db';
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/students', studentRoutes);

async function runStudentTests() {
  console.log('Connecting to MongoDB at:', MONGO_URI);
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB.');

  const PORT = 5002;
  const server = app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
  });

  try {
    const baseUrl = `http://127.0.0.1:${PORT}/api/students`;
    const testRollNo = `TEST-${Date.now()}`;

    // 1. CREATE (POST)
    console.log('\n--- 1. Testing POST /api/students (Create Student) ---');
    const createRes = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Aarav Sharma',
        rollNo: testRollNo,
        course: 'Computer Science',
        age: 20,
      }),
    });
    const createData = await createRes.json();
    console.log('Create status:', createRes.status);
    console.log('Created student:', createData);
    if (!createData.success || !createData.data._id) {
      throw new Error(`Create failed: ${createData.message}`);
    }
    const studentId = createData.data._id;

    // 2. READ ALL (GET)
    console.log('\n--- 2. Testing GET /api/students (Read All Students) ---');
    const getAllRes = await fetch(baseUrl);
    const getAllData = await getAllRes.json();
    console.log('Get all status:', getAllRes.status);
    console.log('Students count:', getAllData.count);
    const found = getAllData.data.some((s) => s._id === studentId);
    if (!found) throw new Error('Created student not found in list');

    // 3. READ ONE (GET /:id)
    console.log('\n--- 3. Testing GET /api/students/:id (Read Student by ID) ---');
    const getOneRes = await fetch(`${baseUrl}/${studentId}`);
    const getOneData = await getOneRes.json();
    console.log('Get one student:', getOneData.data.name, getOneData.data.rollNo);
    if (getOneData.data.rollNo !== testRollNo) throw new Error('Roll number mismatch');

    // 4. UPDATE (PUT /:id)
    console.log('\n--- 4. Testing PUT /api/students/:id (Update Student) ---');
    const updateRes = await fetch(`${baseUrl}/${studentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        course: 'Data Science',
        age: 21,
      }),
    });
    const updateData = await updateRes.json();
    console.log('Update response:', updateData);
    if (updateData.data.course !== 'Data Science' || updateData.data.age !== 21) {
      throw new Error('Update values mismatch');
    }

    // 5. TEST DUPLICATE ROLL NO VALIDATION
    console.log('\n--- 5. Testing Duplicate Roll No validation ---');
    const duplicateRes = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Another Student',
        rollNo: testRollNo, // duplicate
        course: 'Information Technology',
        age: 22,
      }),
    });
    const duplicateData = await duplicateRes.json();
    console.log('Duplicate status (expected 400):', duplicateRes.status);
    console.log('Duplicate response message:', duplicateData.message);
    if (duplicateRes.status !== 400) throw new Error('Duplicate rollNo was unexpectedly accepted');

    // 6. DELETE (DELETE /:id)
    console.log('\n--- 6. Testing DELETE /api/students/:id (Delete Student) ---');
    const deleteRes = await fetch(`${baseUrl}/${studentId}`, {
      method: 'DELETE',
    });
    const deleteData = await deleteRes.json();
    console.log('Delete response:', deleteData);
    if (!deleteData.success) throw new Error('Delete failed');

    // 7. VERIFY POST-DELETE (GET /:id -> 404)
    console.log('\n--- 7. Testing Post-Delete Verification ---');
    const verifyGet = await fetch(`${baseUrl}/${studentId}`);
    console.log('Post-delete fetch status (expected 404):', verifyGet.status);
    if (verifyGet.status !== 404) throw new Error('Student still exists after delete');

    console.log('\n🎉 ALL STUDENT CRUD OPERATIONS VERIFIED & PASSED SUCCESSFULLY!\n');
  } catch (err) {
    console.error('Student tests failed:', err);
    process.exitCode = 1;
  } finally {
    server.close();
    await mongoose.disconnect();
    console.log('Cleaned up server and DB connection.');
  }
}

runStudentTests();
