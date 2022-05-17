import uuidAPIKey from 'uuid-apikey';

const checkApiKey = (req, res, next) => {
  let userApiKey;
  let isValid = false;

  if (req.headers.apikey) {
    userApiKey = req.headers.apikey;
    isValid = uuidAPIKey.check(userApiKey, process.env.DEV_UUID);
  }
  
  if (isValid) {
    next();
  } else {
    res.status(403).send('Unauthorized');
  }
};
// const createApiKeyUuid = app.use('/', (req, res, next) => {
//   return uuidAPIKey.create();
// });

export default checkApiKey;
