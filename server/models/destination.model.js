const mongoose = require('mongoose');

const DestinationSchema = mongoose.Schema({
    image: {
        type:String, 
        required: true
    },
    destinationName: {
        type:String, 
        required: true,
        trim: true
    },
    description: {
        type:String, 
        required: true,
        trim: true
    },
    climate: {
        type:String, 
        required: true,
        trim: true
    }   
}, {
    timestamps: true
});

const Destination = mongoose.model('Destination', DestinationSchema);
module.exports = Destination