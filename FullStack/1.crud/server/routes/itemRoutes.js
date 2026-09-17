const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// @route   GET /api/items
// @desc    Get all items (with optional search and status filtering)
router.get('/', async (req, res) => {
  try {
    const { search, status } = req.query;
    const filter = {};

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while fetching items', error: error.message });
  }
});

// @route   GET /api/items/:id
// @desc    Get a single item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   POST /api/items
// @desc    Create a new item
router.post('/', async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const newItem = new Item({
      title: title.trim(),
      description: description ? description.trim() : '',
      status: status || 'Pending',
    });

    const savedItem = await newItem.save();
    res.status(201).json({ success: true, message: 'Item created successfully', data: savedItem });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Validation error', error: error.message });
  }
});

// @route   PUT /api/items/:id
// @desc    Update an item by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    if (title !== undefined) item.title = title.trim();
    if (description !== undefined) item.description = description.trim();
    if (status !== undefined) item.status = status;

    const updatedItem = await item.save();
    res.json({ success: true, message: 'Item updated successfully', data: updatedItem });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Update failed', error: error.message });
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete an item by ID
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, message: 'Item deleted successfully', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Delete failed', error: error.message });
  }
});

module.exports = router;
