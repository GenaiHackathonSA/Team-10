import axios from 'axios';
import { createExpenseCategory } from '../../api/expenseCategoryApi';

describe('Expense Category API', () => {
    it('should test the createExpenseCategory API function', async () => {
        // Mock data
        const categoryName = 'Test Category';
        const description = 'This is a test category.';

        // Mocking axios.post
        axios.post = jest.fn().mockResolvedValue({
            data: {
                success: true,
                message: 'Category created successfully',
                categoryId: 1,
            },
        });

        // Call the function
        const response = await createExpenseCategory(categoryName, description);

        // Assertions
        expect(axios.post).toHaveBeenCalledWith(
            expect.stringContaining('/category/create'), // Ensure the correct URL endpoint is called
            { categoryName, description },
            { headers: { 'Content-Type': 'application/json' } }
        );
        expect(response.success).toBe(true);
        expect(response.message).toBe('Category created successfully');
        expect(response.categoryId).toBe(1);
    });

    it('should handle errors gracefully', async () => {
        const categoryName = 'Test Category';
        const description = 'This is a test category.';

        // Mocking axios.post to reject with an error
        axios.post = jest.fn().mockRejectedValue(new Error('Network Error'));

        // Call the function and expect it to throw an error
        await expect(createExpenseCategory(categoryName, description)).rejects.toThrow('Network Error');
    });
});
