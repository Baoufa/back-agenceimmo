import express from 'express';
const apiRouter = express.Router()

apiRouter.get('/read', (req, res, next) => {
  console.log('api read');
  res.send('read');
  res.end()
})

apiRouter.post('/add', (req, res, next) => {
  console.log('api read');
  res.send('add')
  res.end()
})

apiRouter.put('/modify', (req, res, next) => {
  console.log('api read');
  res.send('modify')
  res.end()
})

apiRouter.delete('/delete', (req, res, next) => {
  console.log('api read');
  res.send('delete')
  res.end()
})

export default apiRouter;
