const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user.model");

async function seedUser() {
  // Connect to the database
  await mongoose.connect("mongodb://localhost/travelnest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


  // Create user credentials
  const userCredentials = {
    firstName: "Navneesh",
    lastName: "Kaur",
    email:"c0888621@mylambton.ca",
    contact:"4379858222",
    password: "userc0888621",
    // Add other fields as needed
  };

  // Hash the user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userCredentials.password, salt);
  userCredentials.password = hashedPassword;

  // Create user
  await UserModel.create(userCredentials);

  console.log("User created successfully");

  // Close the database connection
  await mongoose.disconnect();
}

// Execute the user seeder
seedUser().then(() => {
  console.log("User seeding completed");
  process.exit(0);
}).catch((err) => {
  console.error("Error seeding user:", err);
  process.exit(1);
});