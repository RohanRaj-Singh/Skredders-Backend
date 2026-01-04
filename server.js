// Server bootstrap (no business logic)
require('./init/loadEnv');
// Initialize DB connection (safe if no URI, will warn)
require('./init/db');

const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 4001;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`[backend] Server is running on http://localhost:${PORT}`);
});
