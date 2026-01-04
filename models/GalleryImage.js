const { Schema, model } = require('mongoose');

const galleryImageSchema = new Schema(
  {
    src: { type: String, required: true, trim: true }, // URL or path
    public_id: { type: String, required: false, trim: true }, // Cloudinary public id (optional)
    alt: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model('GalleryImage', galleryImageSchema);
