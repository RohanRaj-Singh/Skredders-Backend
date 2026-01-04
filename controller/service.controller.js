const prisma = require("../prisma/client");

// GET /api/services
exports.list = async (req, res, next) => {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: [
        { order: "asc" },
        { createdAt: "asc" },
      ],
    });
    res.json(services);
  } catch (err) {
    next(err);
  }
};

// POST /api/services
exports.create = async (req, res, next) => {
  try {
    const item = await prisma.service.create({
      data: req.body,
    });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

// GET /api/services/:id
exports.getById = async (req, res, next) => {
  try {
    const item = await prisma.service.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// PUT /api/services/:id
exports.update = async (req, res, next) => {
  try {
    const item = await prisma.service.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/services/:id
exports.remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid service id" });
    }

    await prisma.service.delete({
      where: { id },
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

