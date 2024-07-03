const mongoose = require('mongoose');

const PackageSchema = mongoose.Schema({
    destinationId: {type: mongoose.Types.ObjectId, ref: 'destination', required: true,},
    packageName: {type:String, required: true, trim: true},
    noOfDays: {type:Number, required: true},
    overviewDetails: {type:String, required: true},
    packageImage: {type:String, required: true},
    amountPerPerson: {type:String, required: true},
    locations: {type:String, required: true},
    highlights: { type: [String], default: [] },
    itinerary: [
        {
            shortDescription: {type:String, required: true},
            longDescription : {type:String, required: true},
            meal: {type:String, required: true},
            image: {type:String, default:null}
        }
    ]  
}, {
    timestamps: true
});

const Package = mongoose.model('Package', PackageSchema);
module.exports = Package
