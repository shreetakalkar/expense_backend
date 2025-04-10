const express = require('express');
const router = express.Router();
const {
  addIncome,
  getIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome
} = require('../controllers/incomeController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addIncome);
router.get('/', auth, getIncomes);
router.get('/:id', auth, getIncomeById);
router.put('/:id', auth, updateIncome);
router.delete('/:id', auth, deleteIncome);

module.exports = router;
