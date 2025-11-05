import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { searchDocuments } from './config/api';

/**
* @description this file contains the main app component for the legal document search portal
* @version 1.0.0
* @author arefin-aareef
* @gitHub https://github.com/arefin-aareef
* @linkedIn https://linkedin.com/in/arefin-aareef
* */

function App() {
	const [searchResults, setSearchResults] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [lastQuery, setLastQuery] = useState('');

	const handleSearch = async query => {
		setIsLoading(true);
		setError(null);
		setLastQuery(query);

		try {
			const data = await searchDocuments(query);
			setSearchResults(data);
		} catch (err) {
			setError(err.message);
			setSearchResults(null);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRetry = () => {
		if (lastQuery) {
			handleSearch(lastQuery);
		}
	};

	const handleReset = () => {
		setSearchResults(null);
		setError(null);
		setLastQuery('');
		setIsLoading(false);
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
			<div className='container mx-auto px-4 py-8'>
				<header className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-3'>
						Legal Document Search
					</h1>
					<p className='text-gray-600 text-lg'>
						Find and analyze legal documents with intelligent search
					</p>
				</header>

				<SearchBar onSearch={handleSearch} isLoading={isLoading} onReset={handleReset} />

				<main>
					{isLoading && <LoadingSpinner />}

					{error && !isLoading && (
						<ErrorMessage message={error} onRetry={handleRetry} />
					)}

					{searchResults && !isLoading && !error && (
						<ResultsList
							results={searchResults.results}
							summary={searchResults.summary}
							processingTime={searchResults.processingTime}
							totalResults={searchResults.totalResults}
						/>
					)}

					{!searchResults && !isLoading && !error && (
						<div className='text-center py-16'>
							<svg
								className='mx-auto h-24 w-24 text-gray-300'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1.5}
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								/>
							</svg>
							<h2 className='mt-6 text-xl font-semibold text-gray-700'>
								Start Your Search
							</h2>
							<p className='mt-2 text-gray-500'>
								Enter keywords to search through our legal document database
							</p>
						</div>
					)}
				</main>

				<footer className='mt-16 text-center text-sm text-gray-500'>
					<p>
						Developed by{' '}
						<a
							href='https://fineef.vercel.app'
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-600 hover:text-blue-800 underline'
						>
							fineef
						</a>
					</p>
				</footer>
			</div>
		</div>
	);
}

export default App;
