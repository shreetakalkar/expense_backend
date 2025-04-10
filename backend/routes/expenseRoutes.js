const express = require('express');
const router = express.Router();
const {
  addExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
} = require('../controllers/expenseController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addExpense);
router.get('/', auth, getExpenses);
router.get('/:id', auth, getExpenseById);
router.put('/:id', auth, updateExpense);
router.delete('/:id', auth, deleteExpense);

module.exports = router;
