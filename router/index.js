// Central API router
const { Router } = require("express");

const router = Router();

router.get("/", (_req, res) => {
  res.json({ name: "ESkreder API", status: "ok" });
});

router.use("/nav-items", require("./nav.routes"));
router.use("/services", require("./service.routes"));
router.use("/pricing-categories", require("./pricing.routes"));
router.use("/gallery-images", require("./gallery.routes"));
router.use("/contact-info", require("./contactInfo.routes"));
router.use("/contact-messages", require("./contactMessage.routes"));
router.use("/uploads", require("./upload.routes"));
router.use("/auth", require("./auth.routes"));
module.exports = router;
