require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const Destination = require("../models/destination.model");

// Create destination credentials
  const destinations = [
    {
      image: "uploads/destination/vietnam.png",
      destinationName: "Vietnam",
      description: "Vietnam, a country shaped like an elongated “.S:,” offers a breathtaking diversity of adventures and landscapes, from bustling megacities to pristine white-sand beaches, emerald-green rice paddies, and towering limestone peaks. With a rich history spanning thousands of years, Vietnam has something to offer every traveler.",
      climate: "uploads/climate/Vietnam-weather.png"
    },
    {
      image: "uploads/destination/cambodia.png",
      destinationName: "Cambodia",
      description: "Nestled on the Indochina Peninsula in Southeast Asia lies Cambodia, a land steeped in rich history and adorned with captivating natural wonders. The official language, Khmer, belongs to the Mon-Khmer group within the Austroasiatic language family, adding a unique linguistic melody to the country’s tapestry.",
      climate: "uploads/climate/Cambodia-weather.png"
    },
    {
      image: "uploads/destination/myanmar.png",
      destinationName: "Myanmar",
      description: "Myanmar, officially the Republic of the Union of Myanmar, is a country in Southeast Asia. It is the largest country by area in Mainland Southeast Asia, and had a population of about 54 million in 2017. Myanmar is bordered by Bangladesh and India to its northwest, China to its northeast, Laos and Thailand to its east and southeast, and the Andaman Sea and the Bay of Bengal to its south and southwest. The country gained independence from Britain in 1948 While Thailand, Japan, and China are famous all over the world, just a small number of tourists know about the mysterious country of Myanmar. /n This destination attracts travelers of many untouched hidden natural beauties, diverse cuisine, captivating culture, and the hospitality of Burmese. The long beaches in the paradise of Ngapali, sacred temples with distinctive golden architectures in Yangon, the ancient ruins of Bagan, and the magnificent sunset moment in Inle Lake, all those things will take your breath away. Join us to learn the basics about this country to be more confident in planning your upcoming trip.",
      climate: "uploads/climate/Myanmar-weather.png"
    },
    {
      image: "uploads/destination/thailand.png",
      destinationName: "Thailand",
      description: "Your Asian escapade would be incomplete without a visit to Thailand, the renowned “Land of Smiles” and home to some of Southeast Asia’s most captivating golden temples. Prepare to be mesmerized by Bangkok, perhaps Asia’s most fascinating capital, where ancient traditions and cultural heritage seamlessly blend with the vibrant energy of modern city life. Explore the bustling streets adorned with ornate temples and palaces, immerse yourself in the vibrant local markets, and savor the tantalizing flavors of Thai cuisine, renowned for its symphony of spices and aromas.",
      climate: "uploads/climate/Thailand-weather.png"
    },

  ];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      // Clear existing destinations
      await Destination.deleteMany({});
      console.log('Existing destinations removed');

      // Insert new seed data
      await Destination.insertMany(destinations);
      console.log('Destinations seeded successfully');
    } catch (error) {
      console.error('Error seeding destinations', error);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });