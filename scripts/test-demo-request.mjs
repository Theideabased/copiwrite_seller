// Offline regression tests: no real leads, Telegram messages, or credentials.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function load(file, dependencies, extras = {}) {
  const compiledModule = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, { exports: compiledModule.exports, module: compiledModule, require: name => dependencies[name], URL, AbortSignal, console: { error() {} }, ...extras });
  return compiledModule.exports;
}
const schema = load('lib/demo-request.ts', {});
const valid = { name: 'Alex Smith', email: 'alex@example.com', company: 'Example HVAC', businessWebsite: 'https://example.com', industry: 'HVAC', leadSource: 'Website', service: 'Missed calls', message: 'Our staff call website leads back the next morning.', website: '' };
assert.equal(Object.keys(schema.validateDemo(valid)).length, 0);
assert.equal(Object.keys(schema.validateDemo({ ...valid, businessWebsite: '' })).length, 0);
assert.ok(schema.validateDemo({ ...valid, businessWebsite: 'javascript:alert(1)' }).businessWebsite);
assert.ok(schema.validateDemo({ ...valid, industry: 'invalid' }).industry);
assert.ok(schema.validateDemo({ ...valid, leadSource: 'invalid' }).leadSource);
assert.ok(schema.validateDemo({ ...valid, service: '' }).service);

let calls = [];
let fail = false;
const env = { TELEGRAM_BOT_TOKEN: 'test-token', TELEGRAM_CHAT_ID: 'test-chat' };
const route = load('app/api/contact/route.ts', {
  '@/lib/demo-request': schema,
  'next/server': { NextResponse: { json: (body, options) => ({ status: options?.status || 200, body }) } },
}, {
  process: { env },
  fetch: async (_url, options) => { if (fail) throw new Error('Simulated timeout'); calls.push(JSON.parse(options.body)); return { ok: true }; },
});
let requestNumber = 0;
const send = (body, ip = `test-${++requestNumber}`) => route.POST({ headers: { get: () => ip }, json: async () => body });
(async () => {
  assert.equal((await send(valid)).status, 200);
  assert.equal(calls.length, 1, 'A real Website field must not trigger the honeypot');
  for (const text of ['https://example.com', 'HVAC', 'Website', 'Missed calls']) assert.ok(calls[0].text.includes(text));
  assert.equal((await send({ ...valid, website: 'spam' })).status, 200);
  assert.equal(calls.length, 1, 'Spam must not send notifications');
  assert.equal((await send({ ...valid, email: 'bad' })).status, 422);
  assert.equal((await send(null)).status, 400);
  assert.equal((await send([])).status, 400);
  fail = true;
  assert.equal((await send(valid)).status, 502);
  fail = false;
  delete env.TELEGRAM_BOT_TOKEN;
  assert.equal((await send(valid)).status, 503);
  for (let i = 0; i < 4; i++) await send({}, 'rate-test');
  assert.equal((await send({}, 'rate-test')).status, 429);
  console.log('PASS: demo validation, website/honeypot separation, notification fields, invalid payloads, network failure, missing configuration, rate limit.');
})().catch(error => { console.error(error); process.exitCode = 1; });
