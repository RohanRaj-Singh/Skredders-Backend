require("dotenv").config();

const mongoose = require("mongoose");
const prisma = require("../prisma/client");
const { Service } = require("../models");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const mongoServices = await Service.find().sort({
      order: 1,
      createdAt: 1,
    });

    if (!mongoServices.length) {
      console.log("No services found in MongoDB.");
      return;
    }

    // Clear MySQL table first
    await prisma.service.deleteMany();

    // Insert into MySQL
    await prisma.service.createMany({
      data: mongoServices.map((s) => ({
        title: s.title,
        description: s.description,
        order: s.order ?? 0,
        isActive: s.isActive ?? true,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
      })),
    });

    console.log(`Seeded ${mongoServices.length} services into MySQL`);
  } catch (err) {
    console.error("Seed failed:", err);
  } finally {
    await mongoose.disconnect();
    await prisma.$disconnect();
  }
}

seed();
