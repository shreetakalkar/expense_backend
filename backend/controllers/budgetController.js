const db = require('../config/db');

exports.addBudget = (req, res) => {
  const { amount, startdate, enddate, category } = req.body;
  const user_id = req.user.user_id;

  const sql = 'INSERT INTO budget (amount, startdate, enddate, category, user_id) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [amount, startdate, enddate, category, user_id], (err) => {
    if (err) return res.status(500).json({ msg: 'Error adding budget', err });
    res.json({ msg: 'Budget added successfully' });
  });
};

exports.getBudgets = (req, res) => {
  db.query('SELECT * FROM budget', (err, results) => {
    if (err) return res.status(500).json({ msg: 'Error fetching budgets', err });
    res.json(results);
  });
};
