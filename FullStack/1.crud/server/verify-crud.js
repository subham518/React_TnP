const mongoose = require('mongoose');
const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crud_db';
const express = require('express');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/items', itemRoutes);

async function runTests() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB.');

  const server = app.listen(5001, () => {
    console.log('Test server running on port 5001');
  });

  try {
    const baseUrl = 'http://127.0.0.1:5001/api/items';

    // 1. CREATE (POST)
    console.log('\n--- 1. Testing POST (Create Item) ---');
    const createRes = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Learn MERN Stack',
        description: 'Complete basic CRUD with React and MongoDB',
        status: 'In Progress',
      }),
    });
    const createData = await createRes.json();
    console.log('Create response status:', createRes.status);
    console.log('Created item:', createData);
    if (!createData.success || !createData.data._id) {
      throw new Error('Create failed');
    }
    const itemId = createData.data._id;

    // 2. READ ALL (GET)
    console.log('\n--- 2. Testing GET ALL (Read Items) ---');
    const getAllRes = await fetch(baseUrl);
    const getAllData = await getAllRes.json();
    console.log('Get all status:', getAllRes.status);
    console.log('Items count:', getAllData.count);
    const found = getAllData.data.some((item) => item._id === itemId);
    if (!found) throw new Error('Created item not found in list');

    // 3. READ ONE (GET by ID)
    console.log('\n--- 3. Testing GET ONE (Read Item by ID) ---');
    const getOneRes = await fetch(`${baseUrl}/${itemId}`);
    const getOneData = await getOneRes.json();
    console.log('Get one item title:', getOneData.data.title);
    if (getOneData.data.title !== 'Learn MERN Stack') throw new Error('Title mismatch');

    // 4. UPDATE (PUT)
    console.log('\n--- 4. Testing PUT (Update Item) ---');
    const updateRes = await fetch(`${baseUrl}/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Learn MERN Stack - Completed!',
        status: 'Completed',
      }),
    });
    const updateData = await updateRes.json();
    console.log('Update response:', updateData);
    if (updateData.data.status !== 'Completed') throw new Error('Status update mismatch');

    // 5. DELETE (DELETE)
    console.log('\n--- 5. Testing DELETE (Delete Item) ---');
    const deleteRes = await fetch(`${baseUrl}/${itemId}`, {
      method: 'DELETE',
    });
    const deleteData = await deleteRes.json();
    console.log('Delete response:', deleteData);
    if (!deleteData.success) throw new Error('Delete failed');

    // Verify it is gone
    const verifyGet = await fetch(`${baseUrl}/${itemId}`);
    console.log('Post-delete fetch status (expected 404):', verifyGet.status);
    if (verifyGet.status !== 404) throw new Error('Item still exists after delete');

    console.log('\n🎉 ALL CRUD OPERATIONS TESTED & PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('Test failed with error:', err);
    process.exitCode = 1;
  } finally {
    server.close();
    await mongoose.disconnect();
    console.log('Cleaned up server and DB connection.');
  }
}

runTests();
