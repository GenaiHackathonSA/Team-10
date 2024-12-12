import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import AdminService from '../../services/adminService';
import toast from 'react-hot-toast';

function CategoryForm({ onSuccess, category }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (category) {
            reset({
                categoryName: category.categoryName,
                transactionType: category.transactionType.transactionTypeId,
                enabled: category.enabled
            });
        }
    }, [category, reset]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const requestData = { ...data, categoryId: category ? category.categoryId : null };
        const serviceMethod = category ? AdminService.updateCategory : AdminService.createCategory;

        await serviceMethod(requestData).then(
            (response) => {
                if (response.data.status === 'SUCCESS') {
                    toast.success(`Category ${category ? 'updated' : 'created'} successfully!`);
                    reset();
                    onSuccess();
                }
            },
            (error) => {
                toast.error(`Failed to ${category ? 'update' : 'create'} category: Try again later!`);
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
                    <option value="1">Expense</option>
                    <option value="2">Income</option>
                </select>
                {errors.transactionType && <small>{errors.transactionType.message}</small>}
            </div>
            <div className="input-box">
                <label>Enabled</label>
                <input type="checkbox" {...register('enabled')} />
            </div>
            <div className="input-box">
                <button type="submit" className={isSubmitting ? 'button loading' : 'button'}>
                    {isSubmitting ? 'Submitting...' : category ? 'Update Category' : 'Create Category'}
                </button>
            </div>
        </form>
    );
}

export default CategoryForm;