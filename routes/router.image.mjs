import express from 'express';
import fileUpload from 'express-fileupload';
import ImageController from '../src/controllers/ImageController.mjs';

const imageRouter = express.Router();


imageRouter.get('/', new ImageController().readAll);
imageRouter.post('/', fileUpload(), new ImageController().addOne);
imageRouter.delete('/:id', new ImageController().deleteOne);

imageRouter.route('/').all((req, res) => {
  res.status(405).send();
});

imageRouter.route('/:id').all((req, res) => {
  res.status(405).send();
});

export default imageRouter;