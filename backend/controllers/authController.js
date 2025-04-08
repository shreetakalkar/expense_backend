const db = require('../config/db');
const jwt = require('jsonwebtoken');


exports.register = (req, res) => {
  const { fname, sname, password, email } = req.body;

  if (!fname || !sname || !password || !email)
    return res.status(400).json({ msg: 'All fields are required' });

  const fullName = `${fname} ${sname}`;

  const insertUserQuery = 'INSERT INTO users (username, password, registrationdate) VALUES (?, ?, NOW())';

  db.query(insertUserQuery, [fullName, password], (err, result) => {
    if (err) return res.status(500).json({ msg: 'User insert error', err });

    const userId = result.insertId;

    const insertEmailQuery = 'INSERT INTO user_emails (email, user_id) VALUES (?, ?)';
    db.query(insertEmailQuery, [email, userId], (err2) => {
      if (err2) return res.status(500).json({ msg: 'Email insert error', err2 });

      res.json({ msg: 'Registered successfully', userId });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: 'Email and password are required' });

  const getUserQuery = `
    SELECT u.user_id, u.password 
    FROM users u
    JOIN user_emails ue ON u.user_id = ue.user_id
    WHERE ue.email = ?
  `;

  db.query(getUserQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', err });
    if (results.length === 0) return res.status(400).json({ msg: 'Invalid email or password' });

    const dbPassword = results[0].password;

    console.log("Entered:", password);
    console.log("DB:", dbPassword);

    if (password !== dbPassword) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const token = jwt.sign({ user_id: results[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ msg: 'Login successful', token });
  });
};
