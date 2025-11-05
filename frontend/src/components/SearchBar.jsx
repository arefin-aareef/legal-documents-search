import React, { useState, useEffect, useRef } from 'react';
import { searchDocuments } from '../config/api';
import AutocompleteDropdown from './AutocompleteDropdown';
import ClearButton from './ClearButton';

/**
* @description this file contains the search bar component for the legal document search portal
* @version 1.0.0
* @author arefin-aareef
* @gitHub https://github.com/arefin-aareef
* @linkedIn https://linkedin.com/in/arefin-aareef
* */

const SearchBar = ({ onSearch, isLoading, onReset }) => {
	const [query, setQuery] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
	const searchBarRef = useRef(null);
	const suggestionsRef = useRef(null);
	const isSelectionMade = useRef(false);

	useEffect(() => {
		if (!query.trim()) {
			setSuggestions([]);
			setShowSuggestions(false);
			isSelectionMade.current = false;
			return;
		}

		if (isSelectionMade.current) {
			isSelectionMade.current = false;
			return;
		}

		const timeoutId = setTimeout(async () => {
			setIsLoadingSuggestions(true);
			try {
				const data = await searchDocuments(query);
				setSuggestions(data.results || []);
				setShowSuggestions(true);
			} catch (err) {
				setSuggestions([]);
				setShowSuggestions(false);
			} finally {
				setIsLoadingSuggestions(false);
			}
		}, 300);

		return () => clearTimeout(timeoutId);
	}, [query]);

	useEffect(() => {
		const handleClickOutside = event => {
			if (
				searchBarRef.current &&
				!searchBarRef.current.contains(event.target) &&
				suggestionsRef.current &&
				!suggestionsRef.current.contains(event.target)
			) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		if (query.trim()) {
			setShowSuggestions(false);
			onSearch(query);
		}
	};

	const handleClear = () => {
		setQuery('');
		setSuggestions([]);
		setShowSuggestions(false);
		if (onReset) {
			onReset();
		}
	};

	const handleSuggestionClick = suggestion => {
		isSelectionMade.current = true;
		setSuggestions([]);
		setShowSuggestions(false);
		setQuery(suggestion.title);
		onSearch(suggestion.title);
	};

	const handleInputChange = e => {
		setQuery(e.target.value);
	};

	return (
		<div className='w-full max-w-3xl mx-auto mb-8 relative' ref={searchBarRef}>
			<form onSubmit={handleSubmit}>
				<div className='flex flex-col sm:flex-row gap-3'>
					<div className='flex-1 relative'>
						<input
							type='text'
							value={query}
							onChange={handleInputChange}
							onFocus={() => {
								if (suggestions.length > 0) {
									setShowSuggestions(true);
								}
							}}
							placeholder="Search legal documents... (e.g., 'employment contract', 'lease agreement')"
							className='w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800'
							disabled={isLoading}
						/>
						{query && (
							<ClearButton handleClear={handleClear} />
						)}
					</div>
					<button
						type='submit'
						disabled={isLoading || !query.trim()}
						className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium'
					>
						{isLoading ? 'Searching...' : 'Search'}
					</button>
				</div>
			</form>

			{showSuggestions && query.trim() && (
				<AutocompleteDropdown
					suggestions={suggestions}
					isLoadingSuggestions={isLoadingSuggestions}
					suggestionsRef={suggestionsRef}
					handleSuggestionClick={handleSuggestionClick}
				/>
			)}
		</div>
	);
};

export default SearchBar;
