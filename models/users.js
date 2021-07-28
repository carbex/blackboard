const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    title: String,
    content: String,
    dateExp: Date,
    read: Boolean,
    sender: String
})

const taskSchema = mongoose.Schema({
    name: String,
    category: String,
    owner:String,
    dateInsert: Date,
    dateDue: Date,
    dateCloture: Date
})

const userSchema = mongoose.Schema({
    firstName: { type: String, match: /^[a-zA-Z0-9-_]+$/ },
    lastName: String,
    email: String,
    password: String,
    age: { type : Number, min: 0 },
    status: String,
    gender: String,
    dateInsert: Date,
    messages: [messageSchema],
    tasks: [taskSchema]
});

module.exports = mongoose.model('users', userSchema);