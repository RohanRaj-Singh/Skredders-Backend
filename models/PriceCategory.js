const { Schema, model } = require('mongoose');

const priceItemSchema = new Schema(
  {
    service: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true }, // flexible string e.g., 'Fra 200 kr'
  },
  { _id: false }
);

const priceCategorySchema = new Schema(
  {
    category: { type: String, required: true, trim: true },
    items: { type: [priceItemSchema], default: [] },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model('PriceCategory', priceCategorySchema);
