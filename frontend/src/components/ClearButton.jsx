import React from 'react'

/**
* @description this file contains the clear button component for the legal document search portal
* @version 1.0.0
* @author arefin-aareef
* @gitHub https://github.com/arefin-aareef
* @linkedIn https://linkedin.com/in/arefin-aareef
* */

const ClearButton = ({ handleClear }) => {
  return (
		<button
			type='button'
			onClick={handleClear}
			className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none'
			aria-label='Clear search'
		>
			<svg
				className='w-5 h-5'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M6 18L18 6M6 6l12 12'
				/>
			</svg>
		</button>
	);
}

export default ClearButton