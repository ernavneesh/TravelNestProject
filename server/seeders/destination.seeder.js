const mongoose = require("mongoose");
const DestinationModel = require("../models/destination.model");

async function seedDestination() {
  // Connect to the database
  await mongoose.connect("mongodb://localhost/travelnest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create destination credentials
  const destinationData = {
    image: "dummy.png",
    destinationName: "Bali",
    description: "This is dummy destination data",
    climate: "climate.png"
    // Add other fields as needed
  };

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