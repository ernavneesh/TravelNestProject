const UserAnalysis = require('../models/userAnalysis.model');

exports.storeInteraction = async (req, res) => {
    const { userId, destinationId } = req.body;

    try {
        let userAnalysis = await UserAnalysis.findOne({ userId, destination: destinationId });

        if (userAnalysis) {
            // If entry exists, increment the numberOfClicks
            userAnalysis.numberOfClicks += 1;
        } else {
            // If entry doesn't exist, create a new entry
            userAnalysis = new UserAnalysis({
                userId,
                destination: destinationId,
                numberOfClicks: 1
            });
        }

        await userAnalysis.save();
        res.status(200).json(userAnalysis);
    } catch (error) {
        res.status(500).send({ error: 'Failed to increment clicks' });
    }
};
