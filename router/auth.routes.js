const express = require("express");
const { login, me } = require("../controller/auth.controller.js");
const { requireAuth } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post("/login", login);
router.get("/me", requireAuth, me);

module.exports = router;
