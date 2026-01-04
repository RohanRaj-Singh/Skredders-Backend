const { Schema, model } = require("mongoose");

const contactInfoSchema = new Schema(
  {
    // details remain as a flexible list of lines (used for arbitrary content)
    details: { type: [String], default: [] },
    // Convenience fields for common contact data (can be used instead of/in addition to `details`)
    address: { type: String, trim: true, default: "" },
    telefon: { type: String, trim: true, default: "" },
    epost: { type: String, trim: true, default: "" },
    apningstider: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model("ContactInfo", contactInfoSchema);
