const prisma = require("../prisma/client");

/**
 * GET /api/pricing-categories
 * ?all=true → include inactive
 */
exports.list = async (req, res, next) => {
  try {
    const includeAll = req.query.all === "true";

    const categories = await prisma.priceCategory.findMany({
      where: includeAll ? {} : { isActive: true },
      orderBy: [
        { order: "asc" },
        { createdAt: "asc" },
      ],
      include: {
        items: includeAll
          ? { orderBy: [{ order: "asc" }, { createdAt: "asc" }] }
          : {
              where: { isActive: true },
              orderBy: [{ order: "asc" }, { createdAt: "asc" }],
            },
      },
    });

    res.json(categories);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/pricing-categories
 */
exports.create = async (req, res, next) => {
  try {
    const { category, items = [], order = 0, isActive = true } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const created = await prisma.priceCategory.create({
      data: {
        category,
        order,
        isActive,
        items: {
          create: items.map((i) => ({
            service: i.service,
            price: i.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};


/**
 * GET /api/pricing-categories/:id
 */
exports.getById = async (req, res, next) => {
  try {
    const item = await prisma.priceCategory.findUnique({
      where: { id: Number(req.params.id) },
      include: { items: true },
    });

    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/pricing-categories/:id
 */
exports.update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { category, items = [], order, isActive } = req.body;

    const updated = await prisma.priceCategory.update({
      where: { id },
      data: {
        category,
        order,
        isActive,
        items: {
          deleteMany: {}, // 🔥 remove old items
          create: items.map((i) => ({
            service: i.service,
            price: i.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};


/**
 * DELETE /api/pricing-categories/:id
 */
exports.remove = async (req, res, next) => {
  try {
    await prisma.priceCategory.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
