import { Router } from 'express';

import { BREWING_PRESETS, ICED_MATCHA } from '../brewing';
import { listTeas } from '../catalog';

export const teas = Router();

// GET /v1/teas — list the collection
teas.get('/', async (_req, res) => {
  const items = await listTeas();
  res.json({ data: items.map(tea => ({ id: tea.id, name: tea.name, style: tea.style })) });
});

// GET /v1/teas/:id — one tea with its default recipe
teas.get('/:id', async (req, res) => {
  const tea = (await listTeas()).find(t => t.id === req.params.id);
  if (!tea) return res.status(404).json({ error: 'tea_not_found' });
  res.json({ data: { ...tea, recipe: BREWING_PRESETS[tea.style] } });
});

// POST /v1/teas/:id/iced — iced matcha recipe for a powdered tea
teas.post('/:id/iced', async (req, res) => {
  const tea = (await listTeas()).find(t => t.id === req.params.id);
  if (!tea) return res.status(404).json({ error: 'tea_not_found' });
  if (tea.style !== 'powdered') {
    return res.status(400).json({ error: 'iced_requires_powdered', message: 'Iced recipes are only available for powdered teas.' });
  }
  res.json({ data: { tea_id: tea.id, ...ICED_MATCHA } });
});
