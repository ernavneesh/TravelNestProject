const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type:String, 
        required: true,
        trim: true
    },
    lastName: {
        type:String, 
        required: true,
        trim: true
    },
    email: {
        type:String, 
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type:String, 
        required: true,
        trim: true
    },
    contact: {
        type:Number, 
        required: true,
        trim: true
    }   
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);
module.exports = User