const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
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
    discoutId: {
        type: mongoose.Types.ObjectId,
        ref: 'discount',
        default:null
    },
    noOfPerson: {
        type:Number, 
        required: true,
        trim: true
    },
    personDetails: [
        {
            firstname:{
                type:String, 
                required: true,
                lowercase: true,
                trim: true
            },
            lastname: {
                type:String, 
                required: true,
                lowercase: true,
                trim: true
            },
            dateOfBirth: {
                type:Date, 
                required: true,
                trim: true
            },
            passportNumber: {
                type:String, 
                required: true,
                lowercase: true,
                trim: true
            },
            passportExpiry:{
                type:Date, 
                required: true,
                trim: true
            },
            contact:{
                type:Number, 
                required: true,
                trim: true
            },
            email:{
                type:String, 
                required: true,
                lowercase: true,
                trim: true
            }
        }
    ],
    amountPerPerson: {
        type:Number, 
        required: true,
        trim: true
    },
    dateOfTravel: {
        type:Date, 
        required: true,
        trim: true
    },
    bookingDate: {
        type:Date, 
        required: true,
        trim: true
    },
    totalAmount: {
        type:Number, 
        required: true,
        trim: true
    }   
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking