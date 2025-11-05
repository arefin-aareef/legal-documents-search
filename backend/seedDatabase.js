require('dotenv').config();
const mongoose = require('mongoose');
const Document = require('./models/Document');

/**
* @description this file contains the seed data for the legal document search portal
* @version 1.0.0
* @author arefin-aareef
* @gitHub https://github.com/arefin-aareef
* @linkedIn https://linkedin.com/in/arefin-aareef
* */

const legalDocuments = [
	{
		docId: 'DOC001',
		title: 'Employment Contract Agreement - Tech Startup',
		category: 'Employment Law',
		content: `This Employment Agreement is entered into between TechCorp Inc. and the Employee. The Employee agrees to perform duties as Software Engineer, reporting to the Chief Technology Officer. Compensation includes base salary of $120,000 annually, stock options vesting over 4 years with a 1-year cliff, and standard benefits including health insurance and 401k matching up to 4%. The agreement includes non-compete clauses valid for 12 months post-termination within a 50-mile radius. Intellectual property created during employment belongs to the company. Either party may terminate with 30 days written notice. Confidentiality obligations survive termination indefinitely.`,
		keywords: [
			'employment',
			'contract',
			'salary',
			'compensation',
			'non-compete',
			'termination',
			'intellectual property',
			'benefits',
			'stock options',
		],
	},
	{
		docId: 'DOC002',
		title: 'Residential Lease Agreement - California',
		category: 'Real Estate Law',
		content: `This Residential Lease Agreement covers a property located at 123 Main Street, San Francisco, CA 94102. Monthly rent is $3,500 due on the first of each month. The lease term is 12 months beginning January 1, 2024. Security deposit of $7,000 is required upfront and will be held in an interest-bearing account. Tenant is responsible for utilities except water and garbage collection. No pets allowed except service animals as defined by ADA. Landlord must provide 24-hour notice before entry except in emergencies. Tenant may not sublease without written permission from landlord. Lease renewal requires 60-day notice from both parties. Late fees of $100 apply after 5-day grace period.`,
		keywords: [
			'lease',
			'rent',
			'landlord',
			'tenant',
			'property',
			'deposit',
			'utilities',
			'california',
			'residential',
		],
	},
	{
		docId: 'DOC003',
		title: 'Business Partnership Agreement - Restaurant Venture',
		category: 'Business Law',
		content: `Partnership Agreement between Maria Rodriguez and John Chen for opening 'Fusion Kitchen' restaurant located in downtown Seattle. Each partner contributes $150,000 initial capital and owns 50% equity. Rodriguez serves as managing partner handling day-to-day operations and staff management. Chen oversees finances, marketing, and supplier relationships. Profits and losses split equally after expenses. Major decisions require unanimous consent including opening new locations, taking loans over $50,000, or bringing in new partners. Partnership dissolves upon death, bankruptcy, or mutual written agreement. In case of dissolution, assets liquidated and distributed per ownership percentage after settling debts. Non-solicitation of employees enforceable for 18 months post-dissolution within same metropolitan area.`,
		keywords: [
			'partnership',
			'business',
			'equity',
			'capital',
			'profits',
			'dissolution',
			'restaurant',
			'venture',
		],
	},
];

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('MongoDB Connected for seeding...');

		await Document.deleteMany({});
		console.log('Existing documents cleared');

		await Document.insertMany(legalDocuments);
		console.log('3 legal documents seeded successfully');

		mongoose.connection.close();
		console.log('Database connection closed');
		process.exit(0);
	} catch (error) {
		console.error('Seeding error:', error);
		process.exit(1);
	}
};

seedDatabase();
