const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminUser = require("../models/AdminUser.js");

const login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await AdminUser.findOne({ email });
  if (!admin) {
    return res.status(401).json({ success: false, error: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) {
    return res.status(401).json({ success: false, error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    success: true,
    data: {
      token,
      user: { id: admin._id, email: admin.email, role: admin.role },
    },
  });
};

const me = async (req, res) => {
  res.json({ success: true, data: req.user });
};

module.exports = { login, me };
