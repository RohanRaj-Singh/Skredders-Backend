// MongoDB connection helper using Mongoose
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

// if (!uri) {
//   console.warn('[backend] Warning: MONGODB_URI is not set. Database connection will not be established.');
// } else {
//   mongoose
//     .connect(uri, {
//       autoIndex: true,
//     })
//     .then(() => {
//       console.log('[backend] Connected to MongoDB');
//     })
//     .catch((err) => {
//       console.error('[backend] MongoDB connection error:', err.message);
//     });
// }
if (process.env.ENABLE_MONGO === "true") {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("[mongo] connected"))
    .catch(err => console.error("[mongo] error", err));
} else {
  console.log("[mongo] disabled");
}


module.exports = mongoose;
