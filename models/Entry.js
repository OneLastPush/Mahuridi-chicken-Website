const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    entryDate: {
        type: Date,
        required: true,
    },
    totalPrice: {
        type: Number,
    },
    type: {
        type: String,
        required: true,
        enum: ['Purchased','Death','Sold']
    },
    note: {
        type: String,
        maxlength: 255,
        trim: true,
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
    }
})

module.exports = mongoose.model('Entry', EntrySchema)