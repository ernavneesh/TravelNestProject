const mongoose = require('mongoose');

const DiscountSchema = mongoose.Schema({
    packageId: {
        type: mongoose.Types.ObjectId,
        ref: 'package',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    rating: {
        type:Number, 
        required: true,
        trim: true
    },
    reviewDescription: {
        type:String, 
        trim: true
    },
    createdAt: {
        type:Date, 
        required: true,
        trim: true
    } 
}, {
    timestamps: true
});

const Discount = mongoose.model('Discount', DiscountSchema);
module.exports = Discount