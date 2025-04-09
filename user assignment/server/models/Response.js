const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    formId: String,
    answers: Object,
});

module.exports = mongoose.model('Response', responseSchema);