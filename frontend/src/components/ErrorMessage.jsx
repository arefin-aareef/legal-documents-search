import React from 'react';

/**
* @description this file contains the error message component for the legal document search portal
* @version 1.0.0
* @author arefin-aareef
* @gitHub https://github.com/arefin-aareef
* @linkedIn https://linkedin.com/in/arefin-aareef
* */

const ErrorMessage = ({ message, onRetry }) => {
	return (
		<div className='max-w-2xl mx-auto'>
			<div className='bg-red-50 border border-red-200 rounded-lg p-6'>
				<div className='flex items-start'>
					<div className='flex-shrink-0'>
						<svg
							className='h-6 w-6 text-red-600'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
					</div>
					<div className='ml-3 flex-1'>
						<h3 className='text-sm font-medium text-red-800'>Error</h3>
						<p className='mt-2 text-sm text-red-700'>{message}</p>
						{onRetry && (
							<button
								onClick={onRetry}
								className='mt-4 px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors'
							>
								Try Again
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ErrorMessage;
