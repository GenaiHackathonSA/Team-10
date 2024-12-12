import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { createExpenseCategory } from '../api/expenseCategoryApi';
import { useDispatch } from 'react-redux';
import { addExpenseCategory } from '../redux/expenseCategoryActions';

function ExpenseCategoryForm() {
    const { register, handleSubmit, reset, formState } = useForm();
    const dispatch = useDispatch();
    
    const renderForm = () => {
        return (
            <form className="expense-category-form" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className='input-box'>
                    <label>Category Name</label><br />
                    <input 
                        type='text'
                        {...register('categoryName', { required: 'Category name is required' })}
                    />
                    {formState.errors.categoryName && <small>{formState.errors.categoryName.message}</small>}
                </div>

                <div className='input-box'>
                    <label>Description</label><br />
                    <input 
                        type='text'
                        {...register('description')}
                    />
                </div>

                <div className='t-btn input-box'>
                    <input type='submit' value='Create Category' className='button button-fill' />
                </div>
            </form>
        );
    };

    const handleFormSubmit = async (data) => {
        // Validate input
        if (!data.categoryName) {
            alert('Category name is required.');
            return;
        }

        try {
            const response = await createExpenseCategory(data.categoryName, data.description);
            if (response.success) {
                dispatch(addExpenseCategory(response.data));
                resetForm();
            } else {
                alert('Failed to create category: ' + response.message);
            }
        } catch (error) {
            console.error('Error creating expense category:', error);
            alert('An error occurred while creating the category. Please try again.');
        }
    };

    const resetForm = () => {
        reset(); // Resets the form to initial state
    };

    return (
        <div>
            {renderForm()}
        </div>
    );
}

export default ExpenseCategoryForm;
