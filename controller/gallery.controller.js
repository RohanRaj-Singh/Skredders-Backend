const prisma = require("../prisma/client");

// GET /api/gallery-images
exports.list = async (req, res, next) => {
  try {
    const includeAll = req.query.all === "true";

    const items = await prisma.galleryImage.findMany({
      where: includeAll ? {} : { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    res.json(items);
  } catch (err) {
    next(err);
  }
};

// POST /api/gallery-images  (multer REQUIRED)
exports.create = async (req, res, next) => {
  try {
    const { src, alt, order, isActive } = req.body;

    if (!src || !alt) {
      return res.status(400).json({
        message: "src and alt are required",
        received: req.body,
      });
    }

    const item = await prisma.galleryImage.create({
      data: {
        src,
        alt,
        order: Number(order) || 0,
        isActive: typeof isActive === "boolean" ? isActive : true,
      },
    });

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};


// GET /api/gallery-images/:id
exports.getById = async (req, res, next) => {
  try {
    const item = await prisma.galleryImage.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// PUT /api/gallery-images/:id
exports.update = async (req, res, next) => {
  try {
    const item = await prisma.galleryImage.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    res.json(item);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/gallery-images/:id
exports.remove = async (req, res, next) => {
  try {
    await prisma.galleryImage.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
