const {Schema, model} = require('mongoose');
const cards = new Schema({
    Title: {
        type: String,
        required: true,
    }, 
    Subtitle: {
        type: String,
        required: true
    },
    fileFollder: {
        type: String,
        required: true
    }, 
    Price: {
        type: Number,
        required: true
    }, 
    Descer: {
        type: String,
      
    },
    types: {
        type: String,
        required: true
    }, 
    Weight: {
        type: Number
    }, 
    Like: {
        type: Number,
        required: true
    }
})

module.exports = model('cards', cards)