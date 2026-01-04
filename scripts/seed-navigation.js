require('dotenv').config();
const mongoose = require('mongoose');
const { PrismaClient } = require('@prisma/client');
const NavItem = require('../models/NavItem.js');

const prisma = new PrismaClient();

async function seed() {
  try {
    // Connect Mongo (reuse your existing URI/env)
    await mongoose.connect(process.env.MONGODB_URI);

    const mongoItems = await NavItem.find().sort({
      order: 1,
      createdAt: 1,
    });

    if (mongoItems.length === 0) {
      console.log("No navigation items found in Mongo.");
      return;
    }

    // Clear MySQL table to avoid duplicates (safe for first seed)
    await prisma.navigationItem.deleteMany();

    // Insert into MySQL
    await prisma.navigationItem.createMany({
      data: mongoItems.map((item) => ({
        label: item.label,
        href: item.href,
        order: item.order ?? 0,
        isActive: item.isActive ?? true,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
    });

    console.log(`Seeded ${mongoItems.length} navigation items into MySQL.`);
  } catch (err) {
    console.error("Seed failed:", err);
  } finally {
    await mongoose.disconnect();
    await prisma.$disconnect();
  }
}

seed();
