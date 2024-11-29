import express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { initializeApp as initializeFirebaseApp } from 'firebase/app'
import { routes } from './routes';
import { errorHandler } from './middlewares/error-handler.middleware';
import { pageNotFoundHandler } from './middlewares/page-not-found.middleware';

initializeApp();
initializeFirebaseApp({
  apiKey: process.env.API_KEY
})
const app = express();

app.get('/', (req, res) => {
  res.send('Bem vindo ao curso de Node.js');
});

routes(app);
pageNotFoundHandler(app);
errorHandler(app);

app.listen(3000, () => {
  console.log('Servidor ativo na porta 3000');
});
