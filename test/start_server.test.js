import test from 'ava';
import Hapi from 'hapi';
import { createServer, setConnection, startServer } from '../lib';


test('startServer starts a server successfully', async t => {
  const server =
    await createServer()
          .then(setConnection({ port: 3000 }))
          .then(startServer);

  t.true(server instanceof Hapi.Server);
});


test('starting two servers on same port causes error', async t => {
  const serverA =
    createServer()
    .then(setConnection({ port: 3001 }))
    .then(startServer);

  t.true(await serverA instanceof Hapi.Server);

  const serverB =
    createServer()
    .then(setConnection({ port: 3001 }))
    .then(startServer);

  const err = await t.throws(serverB);

  t.regex(err.message, /listen EADDRINUSE/);
});
