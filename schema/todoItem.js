const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TodoItem = new Schema({
    subject: {
        type: String,
        require: true,
    },
    description: String,
    completed: Boolean,
    createdBy: String,
    createdAt: String,
    type: String
});

module.exports = mongoose.model('TodoItem', TodoItem);