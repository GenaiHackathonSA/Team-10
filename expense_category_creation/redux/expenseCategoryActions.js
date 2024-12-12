// expense_category_creation/redux/expenseCategoryActions.js

import { ADD_EXPENSE_CATEGORY } from '../constants/actionTypes';
import { createExpenseCategory } from '../api/expenseCategoryApi';

/**
 * This function will create an action to add a new expense category to the Redux store
 * after a successful API response. It will dispatch the ADD_EXPENSE_CATEGORY action 
 * with the new category information.
 *
 * @param {string} categoryName - The name of the expense category.
 * @param {string} description - The description of the expense category.
 * @returns {Function} - A function that dispatches the action to the Redux store.
 */
const addExpenseCategory = (categoryName, description) => {
    return async (dispatch) => {
        try {
            // Call the API function to create an expense category
            const response = await createExpenseCategory(categoryName, description);
            
            if (response.status === 201) {
                // Dispatch action to add the new category to the Redux store
                dispatch({
                    type: ADD_EXPENSE_CATEGORY,
                    payload: response.data, // Assuming the API response contains the new category data
                });
            } else {
                console.error("Failed to create category:", response);
                // Handle unexpected response from the server
            }
        } catch (error) {
            console.error("An error occurred while creating the expense category:", error);
            // Handle error appropriately (e.g., show notification to user)
        }
    };
};

export { addExpenseCategory };
