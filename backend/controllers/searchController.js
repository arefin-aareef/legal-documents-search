const Document = require('../models/Document');

/**
* @description this file contains the search controller for the legal document search portal
* @version 1.0.0
* @author arefin-aareef
* @gitHub https://github.com/arefin-aareef
* @linkedIn https://linkedin.com/in/arefin-aareef
* */

const calculateRelevance = (query, doc) => {
	const queryLower = query.toLowerCase();
	const queryWords = queryLower.split(' ').filter(word => word.length > 2);

	let score = 0;

	const titleLower = doc.title.toLowerCase();
	const matchingInTitle = queryWords.filter(word =>
		titleLower.includes(word)
	).length;
	score += (matchingInTitle / queryWords.length) * 0.4;

	const matchingKeywords = doc.keywords.filter(kw =>
		queryWords.some(word => kw.toLowerCase().includes(word))
	).length;
	score += (matchingKeywords / doc.keywords.length) * 0.3;

	const contentLower = doc.content.toLowerCase();
	const matchingInContent = queryWords.filter(word =>
		contentLower.includes(word)
	).length;
	score += (matchingInContent / queryWords.length) * 0.3;

	return Math.min(score, 1.0);
};

const extractExcerpt = (query, content, maxLength = 250) => {
	const sentences = content.split('. ');
	const queryWords = query
		.toLowerCase()
		.split(' ')
		.filter(word => word.length > 2);

	let bestSentence = sentences[0];
	let bestScore = 0;

	for (const sentence of sentences) {
		const sentenceLower = sentence.toLowerCase();
		const score = queryWords.filter(word =>
			sentenceLower.includes(word)
		).length;

		if (score > bestScore) {
			bestScore = score;
			bestSentence = sentence;
		}
	}

	if (bestSentence.length > maxLength) {
		return bestSentence.substring(0, maxLength) + '...';
	}

	return bestSentence + '.';
};

const generateSummary = (query, results) => {
	if (results.length === 0) {
		return `No documents found matching "${query}". Try different keywords or broader terms.`;
	}

	if (results.length === 1) {
		const doc = results[0];
		return `Found 1 document matching your query. The document "${
			doc.title
		}" has a ${Math.round(
			doc.relevance * 100
		)}% relevance score and covers ${doc.category.toLowerCase()}.`;
	}

	const topDoc = results[0];
	const avgRelevance =
		results.reduce((sum, r) => sum + r.relevance, 0) / results.length;

	return `Found ${
		results.length
	} documents matching "${query}". Top result is "${
		topDoc.title
	}" with ${Math.round(
		topDoc.relevance * 100
	)}% relevance. Average relevance across all results is ${Math.round(
		avgRelevance * 100
	)}%.`;
};

exports.searchDocuments = async (req, res) => {
	const startTime = Date.now();

	try {
		const { query } = req.body;

		if (!query || query.trim().length === 0) {
			return res.status(400).json({
				success: false,
				message: 'Search query is required',
			});
		}

		const documents = await Document.find({
			$text: { $search: query },
		}).select('docId title content category keywords');

		if (documents.length === 0) {
			const allDocs = await Document.find().select(
				'docId title content category keywords'
			);

			const scoredDocs = allDocs
				.map(doc => ({
					doc,
					relevance: calculateRelevance(query, doc),
				}))
				.filter(item => item.relevance > 0.1);

			scoredDocs.sort((a, b) => b.relevance - a.relevance);

			const results = scoredDocs.slice(0, 3).map(item => ({
				docId: item.doc.docId,
				title: item.doc.title,
				category: item.doc.category,
				excerpt: extractExcerpt(query, item.doc.content),
				relevance: parseFloat(item.relevance.toFixed(2)),
			}));

			const processingTime = ((Date.now() - startTime) / 1000).toFixed(3);

			return res.json({
				success: true,
				query,
				results,
				summary: generateSummary(query, results),
				processingTime: parseFloat(processingTime),
				totalResults: results.length,
			});
		}

		const results = documents
			.map(doc => {
				const relevance = calculateRelevance(query, doc);
				return {
					docId: doc.docId,
					title: doc.title,
					category: doc.category,
					excerpt: extractExcerpt(query, doc.content),
					relevance: parseFloat(relevance.toFixed(2)),
				};
			})
			.sort((a, b) => b.relevance - a.relevance);

		const processingTime = ((Date.now() - startTime) / 1000).toFixed(3);

		res.json({
			success: true,
			query,
			results,
			summary: generateSummary(query, results),
			processingTime: parseFloat(processingTime),
			totalResults: results.length,
		});
	} catch (error) {
		console.error('Search error:', error);
		res.status(500).json({
			success: false,
			message: 'Error processing search request',
			error: error.message,
		});
	}
};
