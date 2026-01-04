// const cloudinary = require("cloudinary").v2;
// const streamifier = require("streamifier");

// // configure Cloudinary
// // NOTE: Credentials are hard-coded here per your request. This is less secure than using environment variables
// // and should only be used for local development or testing. Do NOT commit these credentials to a public repo.
// cloudinary.config({
//   cloud_name: "dqz29sopl",
//   api_key: "737492498466458",
//   api_secret: "q-L6SghH-Rc-LjD0TdrZwyJ_cLw",
// });

// function uploadStream(buffer, options = {}) {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       options,
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       }
//     );
//     streamifier.createReadStream(buffer).pipe(stream);
//   });
// }

// exports.uploadImage = async (req, res) => {
//   try {
//     // Quick configuration check (warn but continue if credentials were configured programmatically)
//     if (
//       !process.env.CLOUDINARY_CLOUD_NAME &&
//       !process.env.CLOUDINARY_API_KEY &&
//       !process.env.CLOUDINARY_API_SECRET
//     ) {
//       console.warn(
//         "[upload.controller] Cloudinary env vars not set; relying on programmatic configuration"
//       );
//     }

//     if (!req.file || !req.file.buffer)
//       return res.status(400).json({ message: "No file uploaded" });

//     // Log some basic info for debugging (no secrets)
//     console.log("[upload.controller] upload request:", {
//       originalname: req.file.originalname,
//       mimetype: req.file.mimetype,
//       size: req.file.size,
//     });

//     // optional: restrict to image mime types
//     const mime = req.file.mimetype || "";
//     if (!mime.startsWith("image/")) {
//       return res
//         .status(400)
//         .json({ message: "Only image uploads are allowed" });
//     }

//     // upload to Cloudinary; place in folder 'eskreder' to keep things organized
//     const result = await uploadStream(req.file.buffer, {
//       folder: "eskreder",
//       resource_type: "image",
//     });

//     if (!result || !result.secure_url) {
//       console.error("[upload.controller] upload returned no result", result);
//       return res
//         .status(500)
//         .json({ message: "Upload failed: empty response from cloud provider" });
//     }

//     return res.json({
//       url: result.secure_url,
//       public_id: result.public_id,
//       width: result.width,
//       height: result.height,
//       raw: result,
//     });
//   } catch (err) {
//     // More verbose logging for debugging
//     console.error(
//       "[upload.controller] upload error",
//       err && err.stack ? err.stack : err
//     );
//     const message = err?.message || (err && err.name) || "Upload failed";
//     return res.status(500).json({ message });
//   }
// };

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const url = `${req.protocol}://${req.get("host")}/uploads/gallery/${req.file.filename}`;

    res.json({
      url, // ✅ FULL URL
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } catch (err) {
    console.error("[upload.controller]", err);
    res.status(500).json({ message: "Upload failed" });
  }
};
