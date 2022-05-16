import express from 'express';
import UserController from '../controllers/UserController.mjs';

const userRouter = express.Router()

userRouter.get('/', (req, res, next) => {
  const userController = new UserController();
  userController.readAll(req, res);
})

userRouter.get('/:id', (req, res, next) => {
  const userController = new UserController();
  userController.readOne(req, res);
})

userRouter.post('/add-user', (req, res, next) => {
  const userController = new UserController();
  userController.createOne(req, res);
})

userRouter.put('/update/:id', (req, res, next) => {
  const userController = new UserController();
  userController.updateOne(req, res);
})

userRouter.delete('/delete/:id', (req, res, next) => {
  const userController = new UserController();
  userController.deleteOne(req, res);
})

export default userRouter;
