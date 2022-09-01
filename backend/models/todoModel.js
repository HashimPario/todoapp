const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    todoData: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Todos",todoSchema)