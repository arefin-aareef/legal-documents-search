import axios from 'axios';

/**
* @description this file contains the API configuration for the legal document search portal
* @version 1.0.0
* @author arefin-aareef
* @gitHub https://github.com/arefin-aareef
* @linkedIn https://linkedin.com/in/arefin-aareef
* */

const API_BASE_URL =
	process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000,
});

export const searchDocuments = async query => {
	try {
		const response = await apiClient.post('/generate', { query });
		return response.data;
	} catch (error) {
		if (error.response) {
			throw new Error(error.response.data.message || 'Search failed');
		} else if (error.request) {
			throw new Error(
				'No response from server. Please check if the backend is running.'
			);
		} else {
			throw new Error('Error setting up the request');
		}
	}
};

export default apiClient;
