const express = require('express');
const router = express.Router();
const {
  createIncomeSource,
  getAllIncomeSources,
  getIncomeSourceById,
  updateIncomeSource,
  deleteIncomeSource
} = require('../controllers/incomesourceController');
const auth = require('../middleware/authMiddleware');

// Routes for income source
router.post('/', auth, createIncomeSource);   // Create income source
router.get('/', auth, getAllIncomeSources);   // Get all income sources
router.get('/:id', auth, getIncomeSourceById);  // Get single income source
router.put('/:id', auth, updateIncomeSource);   // Update income source
router.delete('/:id', auth, deleteIncomeSource); // Delete income source

module.exports = router;
