// expense_category_creation/redux/expenseCategoryReducer.js

import { ADD_EXPENSE_CATEGORY } from '../constants/actionTypes';

// Initial state for the expense categories
const initialState = {
    categories: [],
};

// Reducer function to handle state changes related to expense categories
export const expenseCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EXPENSE_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };
        default:
            return state;
    }
};
