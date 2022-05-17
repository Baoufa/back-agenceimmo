import express from 'express';
import userRouter from './router.user.mjs';

const router = express.Router();
router.use('/user', userRouter);

router.route("*").all((req,res) => { res.status(404).send(); });

export default router; 