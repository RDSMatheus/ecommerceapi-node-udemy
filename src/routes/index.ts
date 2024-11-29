import express from 'express';
import { userRoutes } from './users.routes';
import { authRoutes } from './auth.routes';

export const routes = (app: express.Express) => {
  app.use(express.json());
  app.use(authRoutes);
  app.use(userRoutes);
};
