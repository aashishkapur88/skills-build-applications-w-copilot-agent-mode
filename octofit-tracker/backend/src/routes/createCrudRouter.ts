import { Router } from 'express';
import type { Model } from 'mongoose';

export function createCrudRouter(model: Model<any>) {
  const router = Router();

  router.get('/', async (_request, response) => {
    try {
      response.json(await model.find().sort({ createdAt: -1 }));
    } catch (error) {
      response.status(500).json({ error: 'Unable to load records', details: error });
    }
  });

  router.get('/:id', async (request, response) => {
    try {
      const record = await model.findById(request.params.id);
      if (!record) {
        response.status(404).json({ error: 'Record not found' });
        return;
      }
      response.json(record);
    } catch (error) {
      response.status(400).json({ error: 'Invalid record id', details: error });
    }
  });

  router.post('/', async (request, response) => {
    try {
      const record = await model.create(request.body);
      response.status(201).json(record);
    } catch (error) {
      response.status(400).json({ error: 'Unable to create record', details: error });
    }
  });

  return router;
}
