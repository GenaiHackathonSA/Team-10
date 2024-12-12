// frontend/src/components/admin/CategoryForm.js

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import AdminService from '../../services/adminService';
import toast from 'react-hot-toast';

function CategoryForm({ onSuccess }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        await AdminService.createCategory(data).then(
            (response) => {
                if (response.data.status === 'SUCCESS') {
                    toast.success('Category created successfully!');
                    reset();
                    onSuccess();
                }
            },
            (error) => {
                toast.error('Failed to create category: Try again later!');
            }
        );
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="category-form">
            <div className="input-box">
                <label>Category Name</label>
                <input
                    type="text"
                    {...register('categoryName', { required: 'Category name is required' })}
                />
                {errors.categoryName && <small>{errors.categoryName.message}</small>}
            </div>
            <div className="input-box">
                <label>Transaction Type</label>
                <select {...register('transactionType', { required: 'Transaction type is required' })}>
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                </select>
                {errors.transactionType && <small>{errors.transactionType.message}</small>}
            </div>
            <div className="input-box">
                <label>Enabled</label>
                <input type="checkbox" {...register('enabled')} />
            </div>
            <div className="input-box">
                <button type="submit" className={isSubmitting ? 'button loading' : 'button'}>
                    {isSubmitting ? 'Submitting...' : 'Create Category'}
                </button>
            </div>
        </form>
    );
}

export default CategoryForm;