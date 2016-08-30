const Inert = require('inert');

// registerPlugins :: [Hapi.Plugin] -> Hapi.Server -> Promise Hapi.Server
const registerPlugins = plugins => server =>
  new Promise((resolve, reject) =>
    server.register([Inert, ...plugins], err => {
      if (err) reject(err);
      else resolve(server);
    })
  );

module.exports = registerPlugins;
