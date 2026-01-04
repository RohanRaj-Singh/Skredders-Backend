require("dotenv").config();

const mongoose = require("mongoose");
const prisma = require("../prisma/client");
const GalleryImage = require("../models/GalleryImage");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const images = await GalleryImage.find().sort({
      order: 1,
      createdAt: 1,
    });

    if (!images.length) {
      console.log("No gallery images found in MongoDB.");
      return;
    }

    await prisma.galleryImage.deleteMany();

    await prisma.galleryImage.createMany({
      data: images.map((img) => ({
        src: img.src,
        publicId: img.public_id || null,
        alt: img.alt,
        order: img.order ?? 0,
        isActive: img.isActive ?? true,
        createdAt: img.createdAt,
        updatedAt: img.updatedAt,
      })),
    });

    console.log(`Seeded ${images.length} gallery images into MySQL`);
  } catch (err) {
    console.error("Gallery seed failed:", err);
  } finally {
    await mongoose.disconnect();
    await prisma.$disconnect();
  }
}

seed();
