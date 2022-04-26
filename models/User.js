const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    apiId: {
        type: String,
        required: true,
    },
    apiType: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    image: {
        type: String
    },
    createdAt: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)