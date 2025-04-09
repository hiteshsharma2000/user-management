import React, { useState } from 'react';
import axios from 'axios';

const AdminFormBuilder = () => {
    const [title, setTitle] = useState('');
    const [fields, setFields] = useState([]);

    const addField = () => {
        setFields([...fields, { label: '', type: 'text', options: [] }]);
    };

    const handleFieldChange = (index, key, value) => {
        const updatedFields = [...fields];
        updatedFields[index][key] = value;
        setFields(updatedFields);
    };

    const saveForm = async () => {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
    
        try {
            await axios.post('http://localhost:5000/admin/create-form', { title, fields }, {
                headers: { username, password }
            });
            alert('Form Saved Successfully!');
            setTitle('');
            setFields([]);
           window.location.href="/"


        } catch (error) {
            console.error('Error while saving form:', error.response?.data || error.message);
            alert('Failed to save form');
        }
    };
    

    return (
        <div style={{ display: 'flex', flexDirection: "column", gap: "10px", marginLeft: "25%", marginRight: "25%" }}>
            <h2>Create Form</h2>

            <input
                placeholder='Form Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {Array.isArray(fields) && fields.map((field, index) => (
                <div key={index}>
                    <input
                        placeholder='Field Label'
                        value={field.label}
                        onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                    />
                    <select
                        value={field.type}
                        onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                    >
                        <option value='text'>Text</option>
                        <option value='dropdown'>Dropdown</option>
                        <option value='checkbox'>Checkbox</option>
                        <option value='radio'>Radio</option>
                        <option value='Email'>Email</option>
                    </select>
                </div>
            ))}

            <button onClick={addField}>Add Field</button>
            <button onClick={saveForm}>Save Form</button>
        </div>
    );
};

export default AdminFormBuilder;