import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ExpenseCategoryForm from '../../expense_category_creation/expense_category_form'; // Update with your actual import path
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('ExpenseCategoryForm', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    test('testRenderForm', () => {
        render(
            <Provider store={store}>
                <ExpenseCategoryForm />
            </Provider>
        );

        // Check if the form title is rendered
        expect(screen.getByText(/Create Expense Category/i)).toBeInTheDocument();

        // Check if input fields are present
        expect(screen.getByLabelText(/Category Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
        expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    });

    test('testHandleFormSubmit', async () => {
        render(
            <Provider store={store}>
                <ExpenseCategoryForm />
            </Provider>
        );

        // Fill the form
        fireEvent.change(screen.getByLabelText(/Category Name/i), {
            target: { value: 'Food' },
        });
        fireEvent.change(screen.getByLabelText(/Description/i), {
            target: { value: 'All food-related expenses' },
        });

        // Submit the form
        fireEvent.click(screen.getByText(/Submit/i));

        // Validate form submission (You might need to mock the API function here)
        const expectedActions = [{ type: 'ADD_EXPENSE_CATEGORY', payload: { name: 'Food', description: 'All food-related expenses' } }];
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
    });

    test('testResetForm', () => {
        render(
            <Provider store={store}>
                <ExpenseCategoryForm />
            </Provider>
        );

        // Fill the form
        fireEvent.change(screen.getByLabelText(/Category Name/i), {
            target: { value: 'Travel' },
        });
        fireEvent.change(screen.getByLabelText(/Description/i), {
            target: { value: 'Expenses related to travel' },
        });

        // Reset the form (Assuming reset button exists)
        fireEvent.click(screen.getByRole('button', { name: /Reset/i }));

        // Check if the fields are reset
        expect(screen.getByLabelText(/Category Name/i).value).toBe('');
        expect(screen.getByLabelText(/Description/i).value).toBe('');
    });
});
