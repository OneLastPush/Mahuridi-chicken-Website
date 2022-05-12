const mongoose = require('mongoose')

const BatchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    active: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Chicken']
    },
    stage: {
        type: String,
        default: 'New',
        enum: ['New','Incubation','Hatched','Ended']
    },
    birthdate: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

module.exports = mongoose.model('Batch', BatchSchema)