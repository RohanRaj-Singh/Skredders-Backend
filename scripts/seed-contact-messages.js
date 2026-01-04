require("dotenv").config();

const mongoose = require("mongoose");
const prisma = require("../prisma/client");
const ContactMessage = require("../models/ContactMessage");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const messages = await ContactMessage.find().sort({
      createdAt: 1,
    });

    if (!messages.length) {
      console.log("No contact messages found in MongoDB.");
      return;
    }

    await prisma.contactMessage.deleteMany();

    await prisma.contactMessage.createMany({
      data: messages.map((m) => ({
        name: m.name,
        email: m.email,
        phone: m.phone,
        subject: m.subject,
        message: m.message,
        status: m.status || "new",
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
      })),
    });

    console.log(`Seeded ${messages.length} contact messages into MySQL`);
  } catch (err) {
    console.error("ContactMessage seed failed:", err);
  } finally {
    await mongoose.disconnect();
    await prisma.$disconnect();
  }
}

seed();
