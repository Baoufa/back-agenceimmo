import express from 'express';
import RealtyController from '../src/controllers/RealtyController.mjs';

const realtyRouter = express.Router();

realtyRouter.get('/', (req, res, next) => {
  new RealtyController().readAll(req, res);
});

realtyRouter.get('/:id', new RealtyController().readOne);
realtyRouter.post('/', new RealtyController().createOne);
realtyRouter.put('/:id', new RealtyController().updateOne);
realtyRouter.delete('/:id', new RealtyController().deleteOne);

realtyRouter.route('/').all((req, res) => {
  res.status(405).send();
});

realtyRouter.route('/:id').all((req, res) => {
  res.status(405).send();
});

export default realtyRouter;
