import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from './apiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        console.log(user._id, token);
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError("");
                setSuccess(true);
            }
        });
    };

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted"> Nomi </label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required />
            </div>
            <button className="btn btn-primary btn-block"> Kategoriya qo'shish </button>
        </form>
    );
    
    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} qo'shildi</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Kategoriya mavjud</h3>;
        }
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="btn btn-danger btn-block">
                Dashboardga qaytish
            </Link>
        </div>
    );

    return (
        <Layout
            title="Add a new category" description={`Good Day ${user.name}, ready to add a new category?`} >
            <div className="container">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
            </div>
        </Layout>
    );
};

export default AddCategory;