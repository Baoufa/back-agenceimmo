import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express';
import cors from 'cors';
import router from './routes/router.mjs';
import path from 'path';

import fs from 'fs';
import jwt from 'jsonwebtoken';

let pem = fs.readFileSync('./db/pem');

let pemRoo = [
  "-----BEGIN PUBLIC KEY-----",
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu3ozQ5ESqSyMwoJGyhfV",
  "b0p51nrbYgIojq1KAcZ19fd81nf27Mpay0ORG61oTsFqOBnpR8Mdhs6PmN005u0G",
  "8nn9B9HEUtVHW9IX3ev1Y/zijbn0ZcksE7N//MOy6IQ0Lkm6jqxGnsEClLnPjMgJ",
  "PV8KI5GdJbVcs2Ja/TQ4ozW0X2p/DSkNseikIgXpnEusOB5YhvYHK5zlP2K01v+v",
  "pNvqC35zeG85Ga4cZnDhB6qSEAAbBlaG/2aa3hcXKSMmZsmV4EF+bJkbHNIf9mhD",
  "f3VOj06EIRVxPbQ7H+pPdcLpqg4iV87GwNNI6ghzAwIhYa+CXPzqn4U2ReHolwV6",
  "GQIDAQAB",
  "-----END PUBLIC KEY-----"
]

let test = jwt.sign({
  "username": "jack"
}, pem, 
  {
  algorithm: "HS256"
}
)

console.log(test);

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

app.listen(process.env.PORT, () => {
  console.log(
    `Le serveur a demarré sur le port http://localhost:${process.env.PORT}`
  );
});

export default __dirname;