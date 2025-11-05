import React from 'react';
import ResultCard from './ResultCard';

/**
* @description this file contains the results list component for the legal document search portal
* @version 1.0.0
* @author arefin-aareef
* @gitHub https://github.com/arefin-aareef
* @linkedIn https://linkedin.com/in/arefin-aareef
* */

const ResultsList = ({ results, summary, processingTime, totalResults }) => {
	if (!results || results.length === 0) {
		return (
			<div className='text-center py-12 bg-gray-50 rounded-lg'>
				<svg
					className='mx-auto h-12 w-12 text-gray-400'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
					/>
				</svg>
				<h3 className='mt-4 text-lg font-medium text-gray-900'>
					No results found
				</h3>
				<p className='mt-2 text-sm text-gray-500'>
					Try different keywords or broader search terms
				</p>
			</div>
		);
	}

	return (
		<div className='w-full max-w-4xl mx-auto'>
			<div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
					<p className='text-sm text-gray-700'>{summary}</p>
					<div className='flex items-center gap-4 text-xs text-gray-600'>
						<span>
							{totalResults} {totalResults === 1 ? 'result' : 'results'}
						</span>
						<span>•</span>
						<span>{processingTime}s</span>
					</div>
				</div>
			</div>

			<div className='space-y-4'>
				{results.map((result, index) => (
					<ResultCard key={result.docId || index} result={result} />
				))}
			</div>
		</div>
	);
};

export default ResultsList;
