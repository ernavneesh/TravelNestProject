require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const Discount = require("../models/discount.model");

// Create discount
  const discount = [
    {
      destinationId: "667471d084ccda8d5a96158c",
      userId: "6672235ee7bfc46754ac205a",
      offerStartDate: "2024-01-01",
      offerEndDate: "2024-06-01",
      discountPercentage:30,
      status:"active",
      promoCode:"VIE2155"
    },
    {
      destinationId: "667471d084ccda8d5a96158c",
      userId: "66734ec51a1ad1ce7f51a7d2",
      offerStartDate: "2024-02-03",
      offerEndDate: "2024-08-03",
      discountPercentage:30,
      status:"active",
      promoCode:"VIE2146"
    },
    {
      destinationId: "667471d084ccda8d5a96158c",
      userId: "6672235ee7bfc46754ac205a",
      offerStartDate: "2024-01-01",
      offerEndDate: "2024-06-01",
      discountPercentage:30,
      status:"inactive",
      promoCode:"VIE2195"
    },
    {
      destinationId: "667471d084ccda8d5a96158c",
      userId: "6672235ee7bfc46754ac205a",
      offerStartDate: "2024-01-01",
      offerEndDate: "2024-06-01",
      discountPercentage:30,
      status:"used",
      promoCode:"VIE2142"
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
      // Clear existing discount
      await Discount.deleteMany({});
      console.log('Existing discount removed');

      // Insert new seed data
      await Discount.insertMany(discount);
      console.log('Discount seeded successfully');
    } catch (error) {
      console.error('Error seeding discount', error);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });