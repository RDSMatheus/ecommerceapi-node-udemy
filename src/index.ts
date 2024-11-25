import express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { routes } from './routes';
import { errorHandler } from './middlewares/error-handler.middleware';

initializeApp();
const app = express();

app.get('/', (req, res) => {
  res.send('Bem vindo ao curso de Node.js');
});

routes(app);

errorHandler(app);

app.listen(3000, () => {
  console.log('Servidor ativo na porta 3000');
});