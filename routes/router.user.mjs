import express from 'express';
import UserController from '../src/controllers/UserController.mjs';

const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
  const userController = new UserController();
  userController.readAll(req, res);
});

userRouter.get('/:id', (req, res, next) => {
  const userController = new UserController();
  userController.readOne(req, res);
});

userRouter.post('/', (req, res, next) => {
  const userController = new UserController();
  userController.createOne(req, res);
});

userRouter.put('/:id', (req, res, next) => {
  const userController = new UserController();
  userController.updateOne(req, res);
});

userRouter.delete('/:id', (req, res, next) => {
  const userController = new UserController();
  userController.deleteOne(req, res);
});

userRouter.route('/').all((req, res) => {
  res.status(405).send();
});

userRouter.route('/:id').all((req, res) => {
  res.status(405).send();
});

export default userRouter;
