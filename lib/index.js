const createServer = require('./create_server');
const registerPlugins = require('./register_plugins');
const addRoutes = require('./add_routes');
const setConnection = require('./set_connection');
const startServer = require('./start_server');
const logStatus = require('./log_status');
const logError = require('./log_error');

module.exports = {
  createServer,
  registerPlugins,
  addRoutes,
  setConnection,
  startServer,
  logStatus,
  logError,
};
