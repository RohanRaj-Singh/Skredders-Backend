const prisma = require("../prisma/client");

// Public endpoint to submit a contact message
exports.submit = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const doc = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        status: "new",
      },
    });

    res.status(201).json({ id: doc.id, message: "Submitted" });
  } catch (err) {
    next(err);
  }
};

// Admin: list all messages
exports.list = async (req, res, next) => {
  try {
    const items = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// Admin: update message status (new / read / archived)
exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ["new", "read", "archived"];

    if (status && !allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const item = await prisma.contactMessage.update({
      where: { id: Number(req.params.id) },
      data: { status },
    });

    res.json(item);
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Not found" });
    }
    next(err);
  }
};

// Admin: delete message
exports.remove = async (req, res, next) => {
  try {
    await prisma.contactMessage.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Not found" });
    }
    next(err);
  }
};
