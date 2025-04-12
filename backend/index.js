const express = require('express');
const cors = require('cors');
const app = express();
const summaryRoutes = require('./routes/summaryRoutes');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Routes
app.use('/summary', summaryRoutes);
app.use('/user', require('./routes/authRoutes'));
app.use('/expense', require('./routes/expenseRoutes'));
app.use('/income', require('./routes/incomeRoutes'));
app.use('/budget', require('./routes/budgetRoutes'));
app.use('/incomesource', require('./routes/incomesourceRoutes'));  // Income source route

app.listen(5000, () => console.log('Server running on port 5000'));
