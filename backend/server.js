require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const searchRoutes = require('./routes/searchRoutes');

const app = express();

/**
* @description this file contains the server configuration for the legal document search portal
* @version 1.0.0
* @author arefin-aareef
* @gitHub https://github.com/arefin-aareef
* @linkedIn https://linkedin.com/in/arefin-aareef
* */

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.json({
		message: 'Legal Document Search API',
		status: 'active',
		endpoints: {
			search: 'POST /api/generate',
		},
	});
});

app.use('/api', searchRoutes);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: 'Something went wrong on the server',
		error: process.env.NODE_ENV === 'development' ? err.message : {},
	});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
