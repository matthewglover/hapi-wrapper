const Hapi = require('hapi');

// createServer :: Object? -> Promise Hapi.Server
const createServer = (opts = {}) => {
  try {
    return Promise.resolve(new Hapi.Server(opts));
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = createServer;
