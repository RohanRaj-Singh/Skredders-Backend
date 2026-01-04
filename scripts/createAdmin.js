const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AdminUser = require("../models/AdminUser.js");
require("../init/loadEnv.js");
require("../init/db.js");

async function createAdmin() {
  const passwordHash = await bcrypt.hash("admin123", 10);

  await AdminUser.create({
    email: "admin@example.com",
    passwordHash,
  });

  console.log("Admin user created");
  process.exit();
}

createAdmin();
