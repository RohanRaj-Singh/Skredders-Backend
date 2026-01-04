const { Schema, model } = require('mongoose');

// Service offering
const serviceSchema = new Schema(
  {
    iconName: { type: String, trim: true }, // e.g., 'Scissors'
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model('Service', serviceSchema);
