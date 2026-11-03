import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularEnviament } from '../src/utils/enviament.js';

test('carret buit no té cost d\'enviament', () => {
  assert.equal(calcularEnviament([], 0), 0);
});

test('pes fins a 1 kg costa 3,90 €', () => {
  const items = [{ preu: 5, quantitat: 2, pes: 0.5 }];
  assert.equal(calcularEnviament(items, 10), 3.9);
});

test('pes d\'1 a 5 kg costa 5,90 €', () => {
  const items = [{ preu: 5, quantitat: 4 }];
  assert.equal(calcularEnviament(items, 20), 5.9);
});

test('pes de més de 5 kg costa 9,90 €', () => {
  const items = [{ preu: 5, quantitat: 12 }];
  assert.equal(calcularEnviament(items, 60), 0);
  assert.equal(calcularEnviament(items, 40), 9.9);
});

test('comandes de més de 50 € tenen enviament gratuït', () => {
  const items = [{ preu: 5, quantitat: 2 }];
  assert.equal(calcularEnviament(items, 50), 3.9);
  assert.equal(calcularEnviament(items, 50.01), 0);
});
