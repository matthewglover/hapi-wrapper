// registerPlugins :: ?[Hapi.Plugin] -> Hapi.Server -> Promise Hapi.Server Error
const registerPlugins = (plugins = []) => server =>
  new Promise((resolve, reject) =>
    server.register(plugins, err => {
      if (err) reject(err);
      else resolve(server);
    })
  );

module.exports = registerPlugins;
