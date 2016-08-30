// startServer :: Hapi.Server -> Promise Hapi.Server
const startServer = server =>
  new Promise((resolve, reject) =>
    server.start(err => {
      if (err) reject(err);
      else resolve(server);
    })
  );

module.exports = startServer;
