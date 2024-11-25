import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

export class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const users = await new UserService().getAll();
    res.send(users);
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const user = await new UserService().getById(userId);
    res.send(user);
  }

  static async save(req: Request, res: Response, next: NextFunction) {
    await new UserService().save(req.body);
    res.status(201).send({
      message: 'Usuário criado com sucesso!',
    });
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const user = req.body as User;
    await new UserService().update(user, userId);
    res.send({ message: 'Usuário atualizado com sucesso' });
  }

  static async delete(req: Request, res: Response) {
    const userId = req.params.id;

    await new UserService().delete(userId);

    res.status(204).end();
  }
}
