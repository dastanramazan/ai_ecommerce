// Promotes (or creates) a user as admin so they can log into the admin panel.
// Usage: ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=... npm run create-admin
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Admin";

  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables before running this script.");
    process.exit(1);
  }
  if (!process.env.MONGODB_URI) {
    console.error("Missing MONGODB_URI in environment.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const Users = mongoose.model("Users", new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean, default: false },
    cartData: Object,
    date: { type: Date, default: Date.now },
  }));

  const hashedPassword = await bcrypt.hash(password, 10);
  const existing = await Users.findOne({ email });

  if (existing) {
    existing.isAdmin = true;
    existing.password = hashedPassword;
    await existing.save();
    console.log(`Updated existing user ${email} and granted admin access.`);
  } else {
    let cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;
    await Users.create({ name, email, password: hashedPassword, cartData: cart, isAdmin: true });
    console.log(`Created admin user ${email}.`);
  }

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
