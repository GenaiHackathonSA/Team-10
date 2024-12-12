// expense_categories/category_service.js

import axios from 'axios';
import AuthService from '../services/authService';
import { API_BASE_URL } from '../config/apiConfig';

// Function to check if a category already exists
const checkCategoryExists = async (categoryName) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/category/check`, {
            headers: AuthService.authHeader(),
            params: { categoryName }
        });
        return response.data.exists; // Assuming the API returns { exists: true/false }
    } catch (error) {
        console.error("Error checking category existence:", error);
        throw new Error("Failed to check if category exists");
    }
};

// Function to create a new category
const createCategory = async (categoryName) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/category/add`, {
            categoryName
        }, {
            headers: AuthService.authHeader()
        });
        return response.data; // Return the created category data
    } catch (error) {
        console.error("Error creating category:", error);
        throw new Error("Failed to create category");
    }
};

// Function to add a new category
const addNewCategory = async (categoryName) => {
    try {
        // Check if the category already exists
        const exists = await checkCategoryExists(categoryName);
        if (exists) {
            throw new Error("Category already exists. Please choose a different name.");
        }
        
        // If it doesn't exist, create the category
        const newCategory = await createCategory(categoryName);
        return newCategory; // Return the new category details
    } catch (error) {
        console.error("Error adding new category:", error);
        throw new Error("Failed to add new category: " + error.message);
    }
};

export { addNewCategory, checkCategoryExists };
