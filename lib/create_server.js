const Hapi = require('hapi');

// createServer :: Object? -> Promise Hapi.Server
const createServer = (opts = {}) =>
  Promise.resolve(new Hapi.Server(opts));

module.exports = createServer;
