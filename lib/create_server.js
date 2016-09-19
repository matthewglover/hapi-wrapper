const Hapi = require('hapi');
const Inert = require('inert');
const registerPlugins = require('./register_plugins');

// newServer :: Object -> Promise Hapi.Server
const newServer = opts => {
  try {
    return Promise.resolve(new Hapi.Server(opts));
  } catch (err) {
    return Promise.reject(err);
  }
};

// createServer :: Object? -> Promise Hapi.Server
const createServer = (opts = {}) =>
  newServer(opts)
  .then(registerPlugins([Inert]));

module.exports = createServer;
