const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = Schema({
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

// Pre-save middleware to hash password
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });

const User = mongoose.model('User', UserSchema);
module.exports = User