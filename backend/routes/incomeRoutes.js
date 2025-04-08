const express = require('express');
const router = express.Router();
const { addIncome, getIncomes } = require('../controllers/incomeController');
const auth = require('../middleware/authMiddleware');

router.post('/add', auth, addIncome);
router.get('/all', auth, getIncomes);

module.exports = router;