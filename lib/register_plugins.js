const Inert = require('inert');
const addRoutes = require('./add_routes');

const STATIC_ROUTE_HANDLER = {
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: './public',
      listing: false,
    },
  },
};

// privateRegisterPlugins :: ([Hapi.Plugin], Hapi.Server) -> Promise Hapi.Server
const privateRegisterPlugins = (plugins, server) =>
  new Promise((resolve, reject) =>
    server.register([Inert, ...plugins], err => {
      if (err) reject(err);
      else resolve(server);
    })
  );

// registerPlugins :: [HapiPlugin]? -> Hapi.Server -> Promise Hapi.Server
const registerPlugins = (plugins = []) => server =>
  (Array.isArray(plugins) ?
    privateRegisterPlugins(plugins, server)
      .then(addRoutes([STATIC_ROUTE_HANDLER])) :
    Promise.reject(new TypeError('Invalid plugin type: expected array')));

module.exports = registerPlugins;
