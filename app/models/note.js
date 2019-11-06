const mongoose = require('mongoose')

//schema for our note - constructor function - helps us define the shape of a document inside a collection
const Schema = mongoose.Schema
const noteSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref : 'User'
    }
})

//Note constructor function
const Note = mongoose.model('Note',noteSchema)

module.exports = Note