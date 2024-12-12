// expense_categories/category_tests.spec.js

import { addNewCategory, checkCategoryExists, validateCategoryInput } from './category_service'; // Import functions to test
import axios from 'axios'; // Assuming axios is used for API calls

// Mocking axios for testing purposes
jest.mock('axios');

describe('Category Service Tests', () => {
    
    // Test for validating category input
    const testValidateCategoryInput = () => {
        test('should validate correctly with valid inputs', () => {
            const validInput = { categoryName: 'Food', transactionTypeId: 1 };
            const result = validateCategoryInput(validInput);
            expect(result).toBe(true);
        });

        test('should invalidate when category name is missing', () => {
            const invalidInput = { transactionTypeId: 1 };
            const result = validateCategoryInput(invalidInput);
            expect(result).toBe(false);
        });

        test('should invalidate when transactionTypeId is missing', () => {
            const invalidInput = { categoryName: 'Transport' };
            const result = validateCategoryInput(invalidInput);
            expect(result).toBe(false);
        });

        // Additional edge cases can be added here
    };

    // Test for adding a new category
    const testAddNewCategory = () => {
        test('should create a new category successfully', async () => {
            const category = { categoryName: 'Transport', transactionTypeId: 2 };

            // Mock API response
            axios.post.mockResolvedValueOnce({ data: { status: 'SUCCESS' } });

            const exists = await checkCategoryExists(category.categoryName);
            if (!exists) {
                const response = await addNewCategory(category);
                expect(response.data.status).toBe('SUCCESS');
            } else {
                throw new Error('Category already exists');
            }
        });

        test('should fail to create category if it already exists', async () => {
            const category = { categoryName: 'Transport', transactionTypeId: 2 };

            // Simulate that the category already exists
            axios.post.mockRejectedValueOnce(new Error('Category already exists'));

            try {
                await addNewCategory(category);
            } catch (e) {
                expect(e.message).toBe('Category already exists');
            }
        });
    };

    // Run the tests
    testValidateCategoryInput();
    testAddNewCategory();
});
