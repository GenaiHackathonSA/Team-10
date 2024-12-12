import axios from 'axios';
import AuthService from '../services/authService';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'; // Adjust API base URL for your environment

/**
 * Create a new expense category by making an API POST request.
 * 
 * @param {string} categoryName - The name of the new category.
 * @param {string} description - A description of the new category.
 * @returns {Promise<object>} - Returns the server's response.
 * @throws {Error} - Throws an error if the API request fails.
 */
const createExpenseCategory = async (categoryName, description) => {
    // Validate inputs
    if (!categoryName || typeof categoryName !== 'string' || categoryName.trim() === '') {
        throw new Error('Category name is required and should be a non-empty string.');
    }
    if (!description || typeof description !== 'string' || description.trim() === '') {
        throw new Error('Description is required and should be a non-empty string.');
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/category/create`, {
            categoryName,
            description
        }, {
            headers: AuthService.authHeader() // Ensure authentication is handled
        });

        return response.data; // Returning only the relevant data from the response
    } catch (error) {
        // Enhanced error handling with unique message for different error scenarios
        if (error.response) {
            // The request was made and the server responded with a status code
            throw new Error(`Error ${error.response.status}: ${error.response.data.message || 'Failed to create expense category.'}`);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from the server. Please check your network connection.');
        } else {
            // Something happened in setting up the request that triggered an error
            throw new Error(`Request setup error: ${error.message}`);
        }
    }
};

export default createExpenseCategory;
