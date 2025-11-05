const mongoose = require('mongoose');

/**
* @description this file contains the document model for the legal document search portal
* @version 1.0.0
* @author arefin-aareef
* @gitHub https://github.com/arefin-aareef
* @linkedIn https://linkedin.com/in/arefin-aareef
* */

const documentSchema = new mongoose.Schema({
	docId: {
		type: String,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	keywords: [
		{
			type: String,
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

documentSchema.index({ title: 'text', content: 'text', keywords: 'text' });

module.exports = mongoose.model('Document', documentSchema);
