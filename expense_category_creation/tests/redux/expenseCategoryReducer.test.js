import { expenseCategoryReducer } from '../../../redux/expenseCategoryReducer';
import { ADD_EXPENSE_CATEGORY } from '../../../constants/actionTypes';

describe('expenseCategoryReducer', () => {
    const initialState = {
        categories: []
    };

    it('should return the initial state when state is undefined', () => {
        const state = expenseCategoryReducer(undefined, {});
        expect(state).toEqual(initialState);
    });

    it('should handle ADD_EXPENSE_CATEGORY', () => {
        const newCategory = { name: 'Food', description: 'Expenses related to food' };
        const action = {
            type: ADD_EXPENSE_CATEGORY,
            payload: newCategory
        };

        const expectedState = {
            categories: [newCategory]
        };

        const state = expenseCategoryReducer(initialState, action);
        expect(state).toEqual(expectedState);
    });

    it('should handle multiple ADD_EXPENSE_CATEGORY', () => {
        const category1 = { name: 'Transport', description: 'Transportation expenses' };
        const category2 = { name: 'Entertainment', description: 'Entertainment expenses' };

        let state = expenseCategoryReducer(initialState, {
            type: ADD_EXPENSE_CATEGORY,
            payload: category1
        });

        state = expenseCategoryReducer(state, {
            type: ADD_EXPENSE_CATEGORY,
            payload: category2
        });

        const expectedState = {
            categories: [category1, category2]
        };

        expect(state).toEqual(expectedState);
    });

    it('should not modify state for unknown action types', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        const state = expenseCategoryReducer(initialState, action);
        expect(state).toEqual(initialState);
    });
});
