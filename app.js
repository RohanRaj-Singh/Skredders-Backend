// Express app setup (minimal)
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Individual routers (no central index barrel)
const navRouter = require('./router/nav.routes');
const serviceRouter = require('./router/service.routes');
const pricingRouter = require('./router/pricing.routes');
const galleryRouter = require('./router/gallery.routes');
const contactInfoRouter = require('./router/contactInfo.routes');
const contactMessageRouter = require('./router/contactMessage.routes');
const authRouter = require('./router/auth.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check endpoint (setup-only)
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});
const path = require("path");

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Mount API routes directly
app.use('/api/nav-items', navRouter);
app.use('/api/services', serviceRouter);
app.use('/api/pricing-categories', pricingRouter);
app.use('/api/gallery-images', galleryRouter);
app.use('/api/contact-info', contactInfoRouter);
app.use('/api/contact-messages', contactMessageRouter);
app.use("/uploads", express.static("uploads"));

app.use('/api/auth', authRouter);
// Uploads (Cloudinary)
app.use('/api/uploads', require('./router/upload.routes'));



// Basic error handler (setup-level)
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("[backend] Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
