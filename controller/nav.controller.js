// // CRUD for navigation items
// const prisma = require("../prisma/client.js");

// // GET /api/nav-items
// // exports.list = async (req, res, next) => {
// //   try {
// //     const includeAll = req.query.all === 'true';
// //     const where = includeAll ? {} : { isActive: true };

// //     const items = await prisma.navItem.findMany({
// //       where,
// //       orderBy: [
// //         { order: "asc" },
// //         { createdAt: "asc" },
// //       ],
// //     });

// //     res.json(items);
// //   } catch (err) {
// //     next(err);
// //   }
// // };


// exports.list = async (req, res, next) => {
//   try {
//     const items = await prisma.navigationItem.findMany({
//       where: { isActive: true },
//       orderBy: [
//         { order: "asc" },
//         { createdAt: "asc" },
//       ],
//     });

//     res.json(items);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.create = async (req, res, next) => {
//   try {
//     const item = await prisma.navigationItem.create({
//       data: req.body
//     });
//     res.status(201).json(item);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getById = async (req, res, next) => {
//   try {
//     const item = await prisma.navItem.findUnique({
//       where: { id: req.params.id }
//     });
//     if (!item) return res.status(404).json({ message: 'Not found' });
//     res.json(item);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.update = async (req, res, next) => {
//   try {
//     const item = await prisma.navItem.update({
//       where: { id: req.params.id },
//       data: req.body
//     });
//     res.json(item);
//   } catch (err) {
//     if (err.code === 'P2025') {
//       return res.status(404).json({ message: 'Not found' });
//     }
//     next(err);
//   }
// };

// exports.remove = async (req, res, next) => {
//   try {
//     await prisma.navItem.delete({
//       where: { id: req.params.id }
//     });
//     res.json({ message: 'Deleted' });
//   } catch (err) {
//     if (err.code === 'P2025') {
//       return res.status(404).json({ message: 'Not found' });
//     }
//     next(err);
//   }
// };

const prisma = require("../prisma/client.js");

// GET /api/nav-items
const list = async (req, res, next) => {
  try {
    const items = await prisma.navigationitem.findMany({
      where: { isActive: true },
      orderBy: [
        { order: "asc" },
        { createdAt: "asc" },
      ],
    });
    res.json(items);
  } catch (err) {
    console.error("NAV LIST ERROR:", err);
    next(err);
  }
};

// GET /api/nav-items/:id
const getById = async (req, res, next) => {
  try {
    const item = await prisma.navigationitem.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// POST /api/nav-items
const create = async (req, res, next) => {
  try {
    const item = await prisma.navigationitem.create({
      data: {
        label: req.body.label,
        href: req.body.href,
        order: Number(req.body.order) || 0,
        isActive: !!req.body.isActive,
      },
    });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

// PUT /api/nav-items/:id
const update = async (req, res, next) => {
  try {
    const item = await prisma.navigationitem.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/nav-items/:id
const remove = async (req, res, next) => {
  try {
    await prisma.navigationitem.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { list, getById, create, update, remove };
