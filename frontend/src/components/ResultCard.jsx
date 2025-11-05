import React from 'react';

/**
* @description this file contains the result card component for the legal document search portal
* @version 1.0.0
* @author arefin-aareef
* @gitHub https://github.com/arefin-aareef
* @linkedIn https://linkedin.com/in/arefin-aareef
* */

const ResultCard = ({ result }) => {
	const getRelevanceColor = relevance => {
		if (relevance >= 0.7) return 'bg-green-100 text-green-800';
		if (relevance >= 0.4) return 'bg-yellow-100 text-yellow-800';
		return 'bg-red-100 text-red-800';
	};

	const getRelevanceLabel = relevance => {
		if (relevance >= 0.7) return 'High';
		if (relevance >= 0.4) return 'Medium';
		return 'Low';
	};

	return (
		<div className='bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow'>
			<div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3'>
				<div className='flex-1'>
					<h3 className='text-lg font-semibold text-gray-900 mb-1'>
						{result.title}
					</h3>
					<span className='inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded'>
						{result.category}
					</span>
				</div>
				<div className='flex items-center gap-2'>
					<span
						className={`px-3 py-1 rounded-full text-xs font-semibold ${getRelevanceColor(
							result.relevance
						)}`}
					>
						{getRelevanceLabel(result.relevance)}
					</span>
					<span className='text-sm text-gray-500'>
						{Math.round(result.relevance * 100)}%
					</span>
				</div>
			</div>
			<p className='text-gray-700 text-sm leading-relaxed'>{result.excerpt}</p>
			<div className='mt-3 text-xs text-gray-500'>
				Document ID: {result.docId}
			</div>
		</div>
	);
};

export default ResultCard;
