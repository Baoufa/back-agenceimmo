import express from 'express';
import UserController from '../src/controllers/UserController.mjs';

const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
  new UserController().readAll(req, res);
});

userRouter.get('/:id', new UserController().readOne);
userRouter.post('/', new UserController().createOne);
userRouter.put('/:id', new UserController().updateOne);
userRouter.delete('/:id', new UserController().deleteOne);

userRouter.route('/').all((req, res) => {
  res.status(405).send();
});

userRouter.route('/:id').all((req, res) => {
  res.status(405).send();
});

export default userRouter;
