import React from 'react';

/**
 * @description this file contains the autocomplete dropdown component for the legal document search portal
 * @version 1.0.0
 * @author arefin-aareef
 * @gitHub https://github.com/arefin-aareef
 * @linkedIn https://linkedin.com/in/arefin-aareef
 * */

const AutocompleteDropdown = ({
	suggestions,
	isLoadingSuggestions,
	suggestionsRef,
	handleSuggestionClick,
}) => {
	return (
		<div
			ref={suggestionsRef}
			className='absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto'
		>
			{isLoadingSuggestions ? (
				<div className='p-4 text-center text-gray-500'>
					<div className='inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600'></div>
					<span className='ml-2'>Searching...</span>
				</div>
			) : suggestions.length > 0 ? (
				<ul className='divide-y divide-gray-200'>
					{suggestions.map((suggestion, index) => (
						<li
							key={suggestion.docId || index}
							onClick={() => handleSuggestionClick(suggestion)}
							className='px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors'
						>
							<div className='flex items-start justify-between'>
								<div className='flex-1'>
									<h3 className='text-sm font-semibold text-gray-900'>
										{suggestion.title}
									</h3>
									<p className='text-xs text-gray-500 mt-1 line-clamp-2'>
										{suggestion.excerpt}
									</p>
									<div className='flex items-center gap-2 mt-2'>
										<span className='text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded'>
											{suggestion.category}
										</span>
										<span className='text-xs text-gray-400'>
											{Math.round(suggestion.relevance * 100)}% match
										</span>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			) : (
				<div className='p-4 text-center text-gray-500 text-sm'>
					No results found
				</div>
			)}
		</div>
	);
};

export default AutocompleteDropdown;
