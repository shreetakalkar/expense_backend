const express = require('express');
const router = express.Router();
const { addExpense, getExpenses } = require('../controllers/expenseController');
const auth = require('../middleware/authMiddleware');

router.post('/addexpense', auth, addExpense);
router.get('/all', auth, getExpenses);

module.exports = router;