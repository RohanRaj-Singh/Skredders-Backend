const { Schema, model } = require('mongoose');

// Navigation menu item
const navItemSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model('NavItem', navItemSchema);
