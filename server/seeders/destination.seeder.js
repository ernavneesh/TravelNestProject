const mongoose = require("mongoose");
const DestinationModel = require("../models/destination.model");

async function seedDestination() {
  // Connect to the database
  await mongoose.connect("mongodb://localhost/travelnest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create destination credentials
  const destinationData = [
    {
      image: "uploads/destination/vietnam.png",
      destinationName: "Vietnam",
      description: "Vietnam, a country shaped like an elongated “.S:,” offers a breathtaking diversity of adventures and landscapes, from bustling megacities to pristine white-sand beaches, emerald-green rice paddies, and towering limestone peaks. With a rich history spanning thousands of years, Vietnam has something to offer every traveler.",
      climate: "uploads/climate/Vietnam-weather.png"
    },
  ];

  // Create destination
  await DestinationModel.create(destinationData);

  console.log("Destination created successfully");

  // Close the database connection
  await mongoose.disconnect();
}

// Execute the admin seeder
seedDestination().then(() => {
  console.log("Destination seeding completed");
  process.exit(0);
}).catch((err) => {
  console.error("Error seeding Destination:", err);
  process.exit(1);
});