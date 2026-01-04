const { ContactInfo } = require("../models");

exports.list = async (req, res, next) => {
  try {
    const includeAll = req.query.all === "true";
    const filter = includeAll ? {} : { isActive: true };
    const items = await ContactInfo.find(filter).sort({
      order: 1,
      createdAt: 1,
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// Allowed fields for create/update to prevent writing unexpected properties
function sanitizePayload(payload) {
  const out = {};
  if (Array.isArray(payload.details)) out.details = payload.details.map(String);
  if (typeof payload.address === "string") out.address = payload.address.trim();
  if (typeof payload.telefon === "string") out.telefon = payload.telefon.trim();
  if (typeof payload.epost === "string") out.epost = payload.epost.trim();
  if (Array.isArray(payload.apningstider))
    out.apningstider = payload.apningstider.map(String);
  if (typeof payload.order === "number") out.order = payload.order;
  if (typeof payload.isActive === "boolean") out.isActive = payload.isActive;
  return out;
}

exports.create = async (req, res, next) => {
  try {
    const payload = sanitizePayload(req.body || {});
    const item = await ContactInfo.create(payload);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const item = await ContactInfo.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const payload = sanitizePayload(req.body || {});
    const item = await ContactInfo.findByIdAndUpdate(req.params.id, payload, {
      new: true,
    });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await ContactInfo.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
