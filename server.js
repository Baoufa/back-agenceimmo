import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express';
import cors from 'cors';
import router from './routes/router.mjs';
const app = express();
import checkApiKey from './src/middleware/checkApiKey.mjs';

//TODO 
//app.use(express.urlencoded({ extended: true }));


// Cross origin policy
app.use(cors());

app.use('/api', checkApiKey, router);


// router.route('/').all((req, res) => {
//   res.status(403);
//   res.send(
//     '<div>Vous êtes connecté au serveur - Erreur 403 Accès non authorisé<div>'
//   );
//   res.end();
// });

//403 sur toutes les routes inexistantes
app.use('/', (req, res, next) => {
  res.status(403);
  res.send(
    '<div>Vous êtes connecté au serveur - Erreur 403 Accès non authorisé<div>'
  );
  res.end();
});

app.listen(process.env.PORT_HTTP, () => {
  console.log(
    `Le serveur a demarré sur le port http://localhost:${process.env.PORT_HTTP}`
  );
});
