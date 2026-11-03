// Tarifes d'Enviaments Express. Vegeu docs/proveidor-enviaments.md
const PES_PER_DEFECTE_KG = 0.5;
const LLINDAR_ENVIAMENT_GRATUIT = 50;
const TARIFES = [
  { pesMaxim: 1, cost: 3.9 },
  { pesMaxim: 5, cost: 5.9 },
  { pesMaxim: Infinity, cost: 9.9 },
];

/**
 * Calcula el cost d'enviament del carret.
 * @param {Array<{preu: number, quantitat: number, pes?: number}>} items
 * @param {number} subtotal Import del carret després de descomptes.
 * @returns {number} Cost d'enviament en euros.
 */
export function calcularEnviament(items, subtotal) {
  if (items.length === 0) return 0;
  if (subtotal > LLINDAR_ENVIAMENT_GRATUIT) return 0;
  let pesTotal = 0;
  for (const item of items) {
    pesTotal += (item.pes ?? PES_PER_DEFECTE_KG) * item.quantitat;
  }
  return TARIFES.find((t) => pesTotal <= t.pesMaxim).cost;
}
