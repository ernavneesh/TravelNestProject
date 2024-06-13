const mongoose = require('mongoose');

const UserAnalysisSchema = mongoose.Schema({
    destination: {
        type: mongoose.Types.ObjectId,
        ref: 'destination',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    numberOfClicks: {
        type:Number, 
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const UserAnalysis = mongoose.model('UserAnalysis', UserAnalysisSchema);
module.exports = UserAnalysis