const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
// const adminAuth = require('../middleware/authMiddleware');



const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

const adminAuth = (req, res, next) => {
    const { username, password } = req.headers;
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    next();
};


router.post('/create-form', adminAuth,async (req, res) => {
    try {
        const form = new Form(req.body);
        await form.save();
        res.status(201).json(form);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/forms', async (req, res) => {
    const forms = await Form.find();
    res.json(forms);
});

router.delete('/delete-form/:id',adminAuth, async (req, res) => {
    await Form.findByIdAndDelete(req.params.id);
    res.json({ message: 'Form deleted' });
});

module.exports = router;

