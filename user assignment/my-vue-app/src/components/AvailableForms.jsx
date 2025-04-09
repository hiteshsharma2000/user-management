import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AvailableForms = () => {
    const [forms, setForms] = useState([]);
    const isAdmin = !!localStorage.getItem('username');

    useEffect(() => {
        const fetchForms = async () => {
            const res = await axios.get('http://localhost:5000/admin/forms');
            setForms(res.data);
        };
        fetchForms();
    }, []);

    const handleDelete = async (id) => {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');

        try {
            await axios.delete(`http://localhost:5000/admin/delete-form/${id}`, {
                headers: { username, password }
            });
            setForms(forms.filter(form => form._id !== id));
            alert('Form Deleted');
        } catch (err) {
            alert('Failed to delete form');
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Available Forms</h2>
            {forms.length === 0 ? (
                <p>No forms available</p>
            ) : (
                forms.map((form) => (
                    <div key={form._id} style={{ margin: '10px' }}>
                        <h4>{form.title}</h4>
                        <Link to={`/form/${form._id}`}>
                            <button>Fill Form</button>
                        </Link>
                        {isAdmin && (
                            <button onClick={() => handleDelete(form._id)} style={{ marginLeft: '10px', backgroundColor: 'red' }}>
                                Delete Form
                            </button>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default AvailableForms;
