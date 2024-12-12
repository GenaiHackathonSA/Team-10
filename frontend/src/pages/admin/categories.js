// frontend/src/pages/admin/categories.js

import { useState } from 'react';
import AdminService from "../../services/adminService";
import Header from "../../components/utils/header";
import Loading from "../../components/utils/loading";
import useCategories from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import Info from "../../components/utils/Info";
import Container from "../../components/utils/Container";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast/headless";
import CategoryForm from "../../components/admin/CategoryForm";

function AdminCategoriesManagement() {
    const [data, isFetching] = useCategories([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const disableOrEnable = async (categoryId) => {
        await AdminService.disableOrEnableCategory(categoryId).then(
            (response) => {
                if (response.data.status === 'SUCCESS') {
                    window.location.reload();
                }
            },
            (error) => {
                toast.error("Failed to update category: Try again later!");
            }
        );
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingCategory(null);
        window.location.reload();
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setShowForm(true);
    };

    return (
        <Container activeNavId={6}>
            <Header title="Categories" />
            <Toaster />
            <button onClick={() => setShowForm(!showForm)} className="button">
                {showForm ? 'Hide Form' : 'Add New Category'}
            </button>
            {showForm && <CategoryForm onSuccess={handleFormSuccess} category={editingCategory} />}
            {isFetching && <Loading />}
            {!isFetching && data.length === 0 && <Info text={"No categories found!"} />}
            {!isFetching && data.length !== 0 && (
                <table>
                    <CategoriesTableHeader />
                    <CategoriesTableBody data={data} disableOrEnable={disableOrEnable} onEdit={handleEdit} />
                </table>
            )}
        </Container>
    );
}

export default AdminCategoriesManagement;

function CategoriesTableHeader() {
    return (
        <tr>
            <th>Category Id</th>
            <th>Category Name</th>
            <th>Type</th>
            <th>Enabled</th>
            <th>Action</th>
        </tr>
    );
}

function CategoriesTableBody({ data, disableOrEnable, onEdit }) {
    return (
        data.map((item) => {
            return (
                <tr key={item.categoryId}>
                    <td>{"C" + String(item.categoryId).padStart(5, '0')}</td>
                    <td>{item.categoryName}</td>
                    <td>{item.transactionType.transactionTypeName}</td>
                    {item.enabled ? <td style={{ color: '#6aa412' }}>Enabled</td> : <td style={{ color: '#ff0000' }}>Disabled</td>}
                    <td style={{ display: 'flex', gap: '5px' }}>
                        {item.enabled ? (
                            <button onClick={() => disableOrEnable(item.categoryId)} style={{ backgroundColor: '#ff0000' }}>
                                Disable
                            </button>
                        ) : (
                            <button onClick={() => disableOrEnable(item.categoryId)} style={{ backgroundColor: '#6aa412' }}>
                                Enable
                            </button>
                        )}
                        <button onClick={() => onEdit(item)} style={{ backgroundColor: '#007bff' }}>
                            Edit
                        </button>
                    </td>
                </tr>
            );
        })
    );
}