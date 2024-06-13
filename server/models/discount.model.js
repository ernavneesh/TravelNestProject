const mongoose = require('mongoose');

const DiscountSchema = mongoose.Schema({
    destinationId: {
        type: mongoose.Types.ObjectId,
        ref: 'destination',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    noOfPerson: {
        type:Number, 
        required: true,
        trim: true
    },
    offerStartDate: {
        type:Date, 
        required: true,
        trim: true
    },
    offerEndDate: {
        type:Date, 
        required: true,
        trim: true
    },
    discountPercentage: {
        type:Number, 
        required: true,
        trim: true
    },
    status: {
        type:String, 
        enum: ["active","inactive","used"],
        required: true,
        default: "active"
    },
    promoCode: {
        type:String, 
        required: true,
        trim: true
    }   
}, {
    timestamps: true
});

const Discount = mongoose.model('Discount', DiscountSchema);
module.exports = Discount