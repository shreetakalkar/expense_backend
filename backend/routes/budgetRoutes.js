const express = require('express');
const router = express.Router();
const { addBudget, getBudgets } = require('../controllers/budgetController');
const auth = require('../middleware/authMiddleware');

router.post('/add', auth, addBudget);
router.get('/all', auth, getBudgets);

module.exports = router;
