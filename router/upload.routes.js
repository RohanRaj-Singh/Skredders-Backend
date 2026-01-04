const { Router } = require("express");
const upload = require("../middleware/upload");
const { uploadImage } = require("../controller/upload.controller");

const router = Router();

// POST /api/uploads
// field name MUST be "file"
router.post("/", upload.single("file"), uploadImage);

module.exports = router;
