const { Router } = require("express");
const upload = require("../middleware/upload");
const galleryController = require("../controller/gallery.controller");

const router = Router();

router.get("/", galleryController.list);
router.post("/", upload.single("image"), galleryController.create);
router.get("/:id", galleryController.getById);
router.put("/:id", galleryController.update);
router.delete("/:id", galleryController.remove);

module.exports = router;
