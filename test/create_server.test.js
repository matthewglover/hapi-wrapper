import test from 'ava';
import Hapi from 'hapi';
import { createServer } from '../lib';

test('createServer returns a Promise resolving to a server instance', async t => {
  const server = await createServer();
  t.true(server instanceof Hapi.Server);
});

test('createServer rejects a Promise when called with invalid data', async t => {
  t.plan(2);
  const err = await t.throws(createServer('invalid configuration data'));
  t.regex(err.message, /Invalid server options/);
});
