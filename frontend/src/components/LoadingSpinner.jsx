import React from 'react';

/**
* @description this file contains the loading spinner component for the legal document search portal
* @version 1.0.0
* @author arefin-aareef
* @gitHub https://github.com/arefin-aareef
* @linkedIn https://linkedin.com/in/arefin-aareef
* */

const LoadingSpinner = () => {
	return (
		<div className='flex flex-col items-center justify-center py-12'>
			<div className='relative'>
				<div className='w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin'></div>
			</div>
			<p className='mt-4 text-gray-600 font-medium'>Searching documents...</p>
			<p className='mt-1 text-sm text-gray-500'>This may take a few seconds</p>
		</div>
	);
};

export default LoadingSpinner;
