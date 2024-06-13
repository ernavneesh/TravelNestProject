const mongoose = require('mongoose');

const DestinationSchema = mongoose.Schema({
    image: {
        type:String, 
        required: true
    },
    destinationName: {
        type:String, 
        required: true
    },
    description: {
        type:String, 
        required: true
    },
    climate: {
        type:String, 
        required: true
    }   
}, {
    timestamps: true
});

const Destination = mongoose.model('Destination', DestinationSchema);
module.exports = Destination