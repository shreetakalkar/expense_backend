const db = require('../config/db');

exports.addIncome = (req, res) => {
  const { amount, incomedate, description } = req.body;
  const user_id = req.user.user_id;

  const sql = 'INSERT INTO income (amount, incomedate, description, user_id) VALUES (?, ?, ?, ?)';
  
  db.query(sql, [amount, incomedate, description, user_id], (err, result) => {
    if (err) return res.status(500).json({ msg: 'Error adding income', err });
    res.json({ msg: 'Income added successfully' });
  });
};

exports.getIncomes = (req, res) => {
  const user_id = req.user.user_id;

  db.query('SELECT * FROM income WHERE user_id = ?', [user_id], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Error fetching incomes', err });
    res.json(results);
  });
};
