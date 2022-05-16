import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express';
import cors from 'cors';

import userRouter from './src/routes/userRouter.mjs';

const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

// Cross origin policy
app.use(cors());

app.use('/api/user', userRouter);

// 403 sur toutes les routes inexistantes
app.use('/', (req, res, next) => {
  res.status(403);
  res.send('<div>Vous êtes connecté au serveur - Erreur 403 Accès non authorisé<div>')
  res.end();
})

app.listen(process.env.PORT, () => {
  console.log(`Le serveur a demarré sur le port http://localhost:${process.env.PORT}`);
});
