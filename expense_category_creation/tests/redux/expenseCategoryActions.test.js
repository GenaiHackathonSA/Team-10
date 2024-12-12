import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpenseCategory } from '../../redux/expenseCategoryActions';
import { ADD_EXPENSE_CATEGORY } from '../../constants/actionTypes';

// Create a mock store with thunk middleware
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Expense Category Actions', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    it('should create an action to add a new expense category', () => {
        const newCategory = {
            id: 1,
            name: 'Food',
            description: 'Expenses related to food'
        };

        const expectedAction = {
            type: ADD_EXPENSE_CATEGORY,
            payload: newCategory
        };

        store.dispatch(addExpenseCategory(newCategory));

        const actions = store.getActions();
        expect(actions).toEqual([expectedAction]);
    });
});
