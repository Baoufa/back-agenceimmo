import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express';
import cors from 'cors';
import router from './routes/router.mjs';
import path from 'path';
import {ioconnection} from './src/services/webSocket.mjs';


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
import checkApiKey from './src/middleware/checkApiKey.mjs';

app.use(express.urlencoded({ extended: true }));


// Cross origin policy
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res, next) => { 
  eventWebSocket.emit('bdd-new-realty', 'toto');
  res.end();
})

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


const httpServer = app.listen(process.env.PORT, () => {
  console.log(
    `Le serveur a demarré sur le port http://localhost:${process.env.PORT}`
  );
});

ioconnection();


export {__dirname, httpServer};