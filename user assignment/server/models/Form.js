const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
    label: String,
    type: String,
    options: [String],
    required: {
        type: Boolean,
        default: false
    }
});

const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    fields: [fieldSchema]
});

module.exports = mongoose.model('Form', formSchema);
