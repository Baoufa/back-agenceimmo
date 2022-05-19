import express from 'express';
import RealtyTypeController from '../src/controllers/RealtyTypeController.mjs';

const realtyTypeRouter = express.Router();

realtyTypeRouter.get('/', (req, res, next) => {
  new RealtyTypeController().readAll(req, res);
});

realtyTypeRouter.get('/:id', new RealtyTypeController().readOne);
realtyTypeRouter.post('/', new RealtyTypeController().createOne);
realtyTypeRouter.put('/:id', new RealtyTypeController().updateOne);
realtyTypeRouter.delete('/:id', new RealtyTypeController().deleteOne);

realtyTypeRouter.route('/').all((req, res) => {
  res.status(405).send();
});

realtyTypeRouter.route('/:id').all((req, res) => {
  res.status(405).send();
});

export default realtyTypeRouter;
