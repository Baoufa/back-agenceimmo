import express from 'express';
import userRouter from './router.user.mjs';
import realtyTypeRouter from './router.realtyType.mjs';
import realtyRouter from './router.realty.mjs';
import imageRouter from './router.image.mjs';


const router = express.Router();

router.use(express.json());



router.use('/user', userRouter);
router.use('/realty/image', imageRouter);
router.use('/realty/type', realtyTypeRouter);
router.use('/realty', realtyRouter);

router.route("*").all((req,res) => { res.status(404).send(); });

export default router; 