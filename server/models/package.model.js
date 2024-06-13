const mongoose = require('mongoose');

const PackageSchema = mongoose.Schema({
    destinationId: {
        type: mongoose.Types.ObjectId,
        ref: 'destination',
        required: true,
    },
    packageName: {
        type:String,
        required: true,
        trim: true
    },
    noOfDays: {
        type:Number,
        required: true
    },
    overviewDetails: {
        type:String,
        required: true
    },
    packageImage: {
        type:String,
        required: true
    },
    amountPerPerson: {
        type:String,
        required: true
    }    
}, {
    timestamps: true
});

const Package = mongoose.model('Package', PackageSchema);
module.exports = Package