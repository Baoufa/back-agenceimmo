import express from 'express';
import fileUpload from 'express-fileupload';
import ImageController from '../src/controllers/ImageController.mjs';

const imageRouter = express.Router();

imageRouter.use(fileUpload());

imageRouter.post('/', new ImageController().addOne);

export default imageRouter;