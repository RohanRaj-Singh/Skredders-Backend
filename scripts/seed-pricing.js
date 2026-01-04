require("dotenv").config();

const mongoose = require("mongoose");
const prisma = require("../prisma/client");
const PriceCategory = require("../models/PriceCategory");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const categories = await PriceCategory.find().sort({
      order: 1,
      createdAt: 1,
    });

    if (!categories.length) {
      console.log("No pricing data found in MongoDB.");
      return;
    }

    // Clear existing pricing data
    await prisma.priceItem.deleteMany();
    await prisma.priceCategory.deleteMany();

    for (const cat of categories) {
      const createdCategory = await prisma.priceCategory.create({
        data: {
          category: cat.category,
          order: cat.order ?? 0,
          isActive: cat.isActive ?? true,
          createdAt: cat.createdAt,
          updatedAt: cat.updatedAt,
        },
      });

      if (cat.items?.length) {
        await prisma.priceItem.createMany({
          data: cat.items.map((item, index) => ({
            service: item.service,
            price: item.price,
            order: index,
            isActive: true,
            categoryId: createdCategory.id,
          })),
        });
      }
    }

    console.log(`Seeded ${categories.length} pricing categories into MySQL`);
  } catch (err) {
    console.error("Pricing seed failed:", err);
  } finally {
    await mongoose.disconnect();
    await prisma.$disconnect();
  }
}

seed();
