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

router.post('/', auth, createIncomeSource);
router.get('/', auth, getAllIncomeSources);
router.get('/:id', auth, getIncomeSourceById);
router.put('/:id', auth, updateIncomeSource);
router.delete('/:id', auth, deleteIncomeSource);

module.exports = router;
