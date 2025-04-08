const db = require('../config/db');


exports.addExpense = (req, res) => {
  const { expense_name, amount, expensedate, description } = req.body;
  const user_id = req.user.user_id;

  if (!expense_name || !amount || !expensedate)
    return res.status(400).json({ msg: 'expense_name, amount, and expensedate are required' });

  const insertQuery = `
    INSERT INTO expense (expense_name, amount, expensedate, description, user_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(insertQuery, [expense_name, amount, expensedate, description, user_id], (err) => {
    if (err) return res.status(500).json({ msg: 'Error adding expense', err });
    res.json({ msg: 'Expense added successfully' });
  });
};


exports.getExpenses = (req, res) => {
  const user_id = req.user.user_id;

  const query = 'SELECT * FROM expense WHERE user_id = ? ORDER BY expensedate DESC';

  db.query(query, [user_id], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Error fetching expenses', err });
    res.json(results);
  });
};
