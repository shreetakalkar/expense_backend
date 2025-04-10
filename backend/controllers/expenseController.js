const db = require('../config/db');

exports.addExpense = (req, res) => {
  const { expense_name, amount, expensedate, description } = req.body;
  const user_id = req.user.user_id;

  if (!expense_name || !amount || !expensedate)
    return res.status(400).json({ msg: 'Required fields missing' });

  const formattedDate = new Date(expensedate).toISOString().split('T')[0];

  const sql = 'INSERT INTO expense (expense_name, amount, expensedate, description, user_id) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [expense_name, amount, formattedDate, description, user_id], (err) => {
    if (err) return res.status(500).json({ msg: 'Error adding expense', err });
    res.json({ msg: 'Expense added successfully' });
  });
};

exports.getExpenses = (req, res) => {
  const user_id = req.user.user_id;
  db.query('SELECT * FROM expense WHERE user_id = ? ORDER BY expensedate DESC', [user_id], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Error fetching expenses', err });
    res.json(results);
  });
};

exports.getExpenseById = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id;
  db.query('SELECT * FROM expense WHERE expense_id = ? AND user_id = ?', [id, user_id], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Error fetching expense', err });
    if (results.length === 0) return res.status(404).json({ msg: 'Expense not found' });
    res.json(results[0]);
  });
};

exports.updateExpense = (req, res) => {
  const { id } = req.params;
  const { expense_name, amount, expensedate, description } = req.body;
  const user_id = req.user.user_id;

  const formattedDate = new Date(expensedate).toISOString().split('T')[0];

  const sql = 'UPDATE expense SET expense_name = ?, amount = ?, expensedate = ?, description = ? WHERE expense_id = ? AND user_id = ?';
  db.query(sql, [expense_name, amount, formattedDate, description, id, user_id], (err) => {
    if (err) return res.status(500).json({ msg: 'Error updating expense', err });
    res.json({ msg: 'Expense updated successfully' });
  });
};

exports.deleteExpense = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id;
  db.query('DELETE FROM expense WHERE expense_id = ? AND user_id = ?', [id, user_id], (err) => {
    if (err) return res.status(500).json({ msg: 'Error deleting expense', err });
    res.json({ msg: 'Expense deleted successfully' });
  });
};
