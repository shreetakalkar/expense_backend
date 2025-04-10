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
  const user_id = req.user.user_id;
  db.query('SELECT * FROM budget WHERE user_id = ?', [user_id], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Error fetching budgets', err });
    res.json(results);
  });
};

exports.getBudgetById = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id;
  db.query('SELECT * FROM budget WHERE budget_id = ? AND user_id = ?', [id, user_id], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Error fetching budget', err });
    if (results.length === 0) return res.status(404).json({ msg: 'Budget not found' });
    res.json(results[0]);
  });
};

exports.updateBudget = (req, res) => {
  const { id } = req.params;
  const { amount, startdate, enddate, category } = req.body;
  const user_id = req.user.user_id;
  const sql = 'UPDATE budget SET amount = ?, startdate = ?, enddate = ?, category = ? WHERE budget_id = ? AND user_id = ?';
  db.query(sql, [amount, startdate, enddate, category, id, user_id], (err, result) => {
    if (err) return res.status(500).json({ msg: 'Error updating budget', err });
    res.json({ msg: 'Budget updated successfully' });
  });
};

exports.deleteBudget = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id;
  db.query('DELETE FROM budget WHERE budget_id = ? AND user_id = ?', [id, user_id], (err) => {
    if (err) return res.status(500).json({ msg: 'Error deleting budget', err });
    res.json({ msg: 'Budget deleted successfully' });
  });
};