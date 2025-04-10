const db = require('../config/db');

exports.addIncome = (req, res) => {
  const { amount, incomedate, description } = req.body;
  const user_id = req.user.user_id;
  const sql = 'INSERT INTO income (amount, incomedate, description, user_id) VALUES (?, ?, ?, ?)';
  db.query(sql, [amount, incomedate, description, user_id], (err) => {
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

exports.getIncomeById = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id;
  db.query('SELECT * FROM income WHERE income_id = ? AND user_id = ?', [id, user_id], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Error fetching income', err });
    if (results.length === 0) return res.status(404).json({ msg: 'Income not found' });
    res.json(results[0]);
  });
};

exports.updateIncome = (req, res) => {
  const { id } = req.params;
  const { amount, incomedate, description } = req.body;
  const user_id = req.user.user_id;

  // Convert full datetime to 'YYYY-MM-DD' format
  const formattedDate = new Date(incomedate).toISOString().split('T')[0];

  const sql = 'UPDATE income SET amount = ?, incomedate = ?, description = ? WHERE income_id = ? AND user_id = ?';
  db.query(sql, [amount, formattedDate, description, id, user_id], (err, result) => {
    if (err) {
      console.error("Update Error:", err);
      return res.status(500).json({ msg: 'Error updating income', err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Income not found or not authorized' });
    }

    res.json({ msg: 'Income updated successfully' });
  });
};


exports.deleteIncome = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id;
  db.query('DELETE FROM income WHERE income_id = ? AND user_id = ?', [id, user_id], (err, result) => {
    if (err) return res.status(500).json({ msg: 'Error deleting income', err });
    if (result.affectedRows === 0) return res.status(404).json({ msg: 'Income not found or not authorized' });
    res.json({ msg: 'Income deleted successfully' });
  });
};
