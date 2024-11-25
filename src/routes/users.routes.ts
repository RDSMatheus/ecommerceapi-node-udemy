import express from 'express';
import { UserController } from '../controllers/users.controller';
import asyncHandler from 'express-async-handler';
import { celebrate, Joi, Segments } from 'celebrate';

export const userRoutes = express.Router();

userRoutes.get('/users', asyncHandler(UserController.getAll));
userRoutes.get('/users/:id', asyncHandler(UserController.getById));
userRoutes.post(
  '/users',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      email: Joi.string().email().required,
    }),
  }),
  asyncHandler(UserController.save),
);
userRoutes.put('/users/:id', asyncHandler(UserController.update));
userRoutes.delete('/users/:id', asyncHandler(UserController.delete));
