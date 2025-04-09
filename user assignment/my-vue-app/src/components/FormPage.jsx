import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FormPage = () => {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchForm = async () => {
            const res = await axios.get(`http://localhost:5000/form/${id}`);
            setForm(res.data);
        };
        fetchForm();
    }, [id]);

    const handleChange = (e, label) => {
        setFormData({ ...formData, [label]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:5000/form/submit/${id}`, formData);
        alert('Form Submitted');
    };

    if (!form) return <div>Loading...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: "column", gap: "10px", marginLeft: "25%", marginRight: "25%" }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: "column", gap: "10px", marginLeft: "25%", marginRight: "25%" }}>
            <h2>{form.title}</h2>
            {form.fields.map((field, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: "column", gap: "10px" }}>
                    <label>{field.label}</label>
                   
                    <input type='text' onChange={(e) => handleChange(e, field.label)} />
                </div>
            ))}
            <button type='submit'>Submit</button>
        </form>
        </div>
    );
};

export default FormPage;