const { Router } = require("express");
const { requireAuth, requireAdmin } = require("../middleware/auth.middleware.js");
const navController = require("../controller/nav.controller");

const router = Router();

// Public routes (for displaying navigation)
router.get("/", navController.list);
router.get("/:id", navController.getById);

// Admin-only routes (require authentication and admin role)
router.post("/", requireAuth, requireAdmin, navController.create);
router.put("/:id", requireAuth, requireAdmin, navController.update);
router.delete("/:id", requireAuth, requireAdmin, navController.remove);

module.exports = router;
