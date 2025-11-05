const express = require('express');
const router = express.Router();
const { searchDocuments } = require('../controllers/searchController');

/**
* @description this file contains the search routes for the legal document search portal
* @version 1.0.0
* @author arefin-aareef
* @gitHub https://github.com/arefin-aareef
* @linkedIn https://linkedin.com/in/arefin-aareef
* */

router.post('/generate', searchDocuments);

module.exports = router;
