const db = require('../config/db');

exports.getSummary = (req, res) => {
  const user_id = req.user.user_id;

  const incomeQuery = 'SELECT * FROM income WHERE user_id = ?';
  const expenseQuery = 'SELECT * FROM expense WHERE user_id = ?';
  const budgetQuery = 'SELECT * FROM budget WHERE user_id = ?';

  const incomePromise = new Promise((resolve, reject) => {
    db.query(incomeQuery, [user_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });

  const expensePromise = new Promise((resolve, reject) => {
    db.query(expenseQuery, [user_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });

  const budgetPromise = new Promise((resolve, reject) => {
    db.query(budgetQuery, [user_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });

  Promise.all([incomePromise, expensePromise, budgetPromise])
    .then(([income, expenses, budgets]) => {
      res.json({ income, expenses, budgets });
    })
    .catch(err => {
      console.error('Error fetching summary:', err);
      res.status(500).json({ msg: 'Failed to fetch summary', error: err });
    });
};
