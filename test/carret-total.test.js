import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { crearApp } from '../src/app.js';
import { crearBaseDades } from '../src/db.js';

let servidor;
let base;

before(() => {
  servidor = crearApp(crearBaseDades()).listen(0);
  base = `http://localhost:${servidor.address().port}`;
});

after(() => servidor.close());

async function calcularTotal(body) {
  const resposta = await fetch(`${base}/api/carret/total`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { status: resposta.status, dades: await resposta.json() };
}

test('POST /api/carret/total retorna subtotal, enviament i total', async () => {
  const { status, dades } = await calcularTotal({
    items: [{ preu: 10, quantitat: 2 }],
    descompte: 0,
  });
  assert.equal(status, 200);
  assert.deepEqual(dades, { subtotal: 20, enviament: 3.9, total: 23.9 });
});

test('POST /api/carret/total aplica l\'enviament gratuït per sobre de 50 € després de descomptes', async () => {
  const { dades } = await calcularTotal({
    items: [{ preu: 30, quantitat: 2 }],
    descompte: 10,
  });
  assert.equal(dades.subtotal, 54);
  assert.equal(dades.enviament, 0);
  assert.equal(dades.total, 54);
});

test('POST /api/carret/total retorna 400 si el descompte és fora de rang', async () => {
  const { status, dades } = await calcularTotal({ items: [], descompte: 120 });
  assert.equal(status, 400);
  assert.ok(dades.error);
});
