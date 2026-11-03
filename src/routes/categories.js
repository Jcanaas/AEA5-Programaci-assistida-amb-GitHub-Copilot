import { Router } from 'express';

export function routerCategories(db) {
  const router = Router();

  // GET /api/categories
  router.get('/', (req, res) => {
    try {
      const categories = db
        .prepare(
          `SELECT categoria AS nom, COUNT(*) AS numProductes
           FROM productes
           GROUP BY categoria
           ORDER BY categoria`
        )
        .all();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'No s\'han pogut carregar les categories' });
    }
  });

  return router;
}
