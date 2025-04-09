const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const Response = require('../models/Response');

router.get('/:id', async (req, res) => {
    const form = await Form.findById(req.params.id);
    res.json(form);
});

router.post('/submit/:id', async (req, res) => {
    const response = new Response({ formId: req.params.id, answers: req.body });
    await response.save();
    res.json({ message: 'Response submitted' });
});

module.exports = router;