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

test('GET /api/categories retorna les categories amb el nombre de productes', async () => {
  const resposta = await fetch(`${base}/api/categories`);
  assert.equal(resposta.status, 200);
  const categories = await resposta.json();
  assert.deepEqual(categories, [
    { nom: 'casa', numProductes: 2 },
    { nom: 'papereria', numProductes: 2 },
    { nom: 'roba', numProductes: 2 },
  ]);
});

test('GET /api/categories retorna JSON', async () => {
  const resposta = await fetch(`${base}/api/categories`);
  assert.match(resposta.headers.get('content-type'), /application\/json/);
});
