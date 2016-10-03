import test from 'ava';
import { createServer, setConnection, registerPlugins } from '../lib';
import provisionInjectPromise from '../test-helpers/provision-inject-promise';

const handler = (req, reply) => reply('test route works');
const testRoute = { method: 'GET', path: '/test', handler };

test('registerPlugins registers array of Hapi Plugins', async t => {
  const register = (server, options, next) => {
    server.route(testRoute);
    next();
  };
  register.attributes = { name: 'test-plugin' };
  const customPlugin = { register };

  const server =
    await createServer()
    .then(setConnection())
    .then(registerPlugins([customPlugin]))
    .then(provisionInjectPromise);

  const reply =
    await server.injectPromise({ method: 'GET', url: '/test' });

  t.regex(reply.result, /test route works/);
});

test('registerPlugins plugins array is optional', t => {
  const server =
    createServer()
    .then(setConnection())
    .then(registerPlugins())
    .then(provisionInjectPromise);

  t.notThrows(server);
});

test('registerPlugins rejects a Promise when called with non-array', async t => {
  t.plan(2);
  const server =
    createServer()
    .then(setConnection())
    .then(registerPlugins(''));

  const err = await t.throws(server);
  t.regex(err.message, /Cannot read property 'register' of undefined/);
});

test('registerPlugins rejects a Promise when plugin throws async err', async t => {
  const register = (server, options, next) => {
    process.nextTick(() => next(new Error('boom')));
  };
  register.attributes = { name: 'explodingPlugin' };
  const explodingPlugin = { register };

  const server =
    createServer()
    .then(setConnection())
    .then(registerPlugins([explodingPlugin]));

  const err = await t.throws(server);
  t.regex(err.message, /boom/);
});
