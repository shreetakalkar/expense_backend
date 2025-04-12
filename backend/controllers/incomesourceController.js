const db = require('../config/db');

// Create a new income source
exports.createIncomeSource = async (req, res) => {
  const { name, description, income_id } = req.body;

  if (!name || !income_id) {
    return res.status(400).json({ error: 'Name and income_id are required' });
  }

  try {
    const query = 'INSERT INTO incomesource (name, description, income_id) VALUES (?, ?, ?)';
    await db.execute(query, [name, description || null, income_id]);
    res.status(201).json({ message: 'Income source created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all income sources
exports.getAllIncomeSources = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM incomesource');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single income source by ID
exports.getIncomeSourceById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('SELECT * FROM incomesource WHERE source_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Income source not found' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an income source
exports.updateIncomeSource = async (req, res) => {
  const { id } = req.params;
  const { name, description, income_id } = req.body;

  if (!name || !income_id) {
    return res.status(400).json({ error: 'Name and income_id are required' });
  }

  try {
    const query = 'UPDATE incomesource SET name = ?, description = ?, income_id = ? WHERE source_id = ?';
    await db.execute(query, [name, description || null, income_id, id]);
    res.status(200).json({ message: 'Income source updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an income source
exports.deleteIncomeSource = async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute('DELETE FROM incomesource WHERE source_id = ?', [id]);
    res.status(200).json({ message: 'Income source deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
