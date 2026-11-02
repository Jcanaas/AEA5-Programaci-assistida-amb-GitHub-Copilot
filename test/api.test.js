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

test('GET /api/productes retorna tots els productes', async () => {
  const resposta = await fetch(`${base}/api/productes`);
  assert.equal(resposta.status, 200);
  const productes = await resposta.json();
  assert.equal(productes.length, 6);
});


test('GET /api/productes inclou mitjana i nombre de ressenyes', async () => {
  const resposta = await fetch(`${base}/api/productes`);
  const productes = await resposta.json();

  const samarreta = productes.find((p) => p.id === 1);
  assert.equal(samarreta.mitjana, 4);
  assert.equal(samarreta.numRessenyes, 2);

  const dessuadora = productes.find((p) => p.id === 2);
  assert.equal(dessuadora.mitjana, null);
  assert.equal(dessuadora.numRessenyes, 0);
});

test('GET /api/productes?categoria=roba filtra per categoria', async () => {
  const resposta = await fetch(`${base}/api/productes?categoria=roba`);
  const productes = await resposta.json();
  assert.ok(productes.every((p) => p.categoria === 'roba'));
});

test('GET /api/productes/:id retorna 404 si no existeix', async () => {
  const resposta = await fetch(`${base}/api/productes/999`);
  assert.equal(resposta.status, 404);
});

test('publicar una ressenya actualitza la mitjana del producte', async () => {
  await fetch(`${base}/api/ressenyes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ producteId: 2, autor: 'Test', text: 'Bona.', puntuacio: 4 }),
  });
  const productes = await (await fetch(`${base}/api/productes`)).json();
  const dessuadora = productes.find((p) => p.id === 2);
  assert.equal(dessuadora.mitjana, 4);
  assert.equal(dessuadora.numRessenyes, 1);
});
