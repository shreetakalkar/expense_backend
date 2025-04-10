const express = require('express');
const router = express.Router();
const {
  addBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget
} = require('../controllers/budgetController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addBudget);
router.get('/', auth, getBudgets);
router.get('/:id', auth, getBudgetById);
router.put('/:id', auth, updateBudget);
router.delete('/:id', auth, deleteBudget);

module.exports = router;
