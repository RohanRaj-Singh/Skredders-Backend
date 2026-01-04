// Environment loader
const path = require('path');
const dotenv = require('dotenv');

// Load .env from project root if present
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

module.exports = {};
