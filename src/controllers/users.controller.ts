import { NextFunction, Request, Response } from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import { ValidationError } from '../errors/validation.error';
import { NotFoundError } from '../errors/not-found.error';

type User = {
  id: number;
  nome: string;
  email: string;
};

export class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const snapshot = await getFirestore().collection('users').get();
      const users = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      res.send(users);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const doc = await getFirestore().collection('user').doc(userId).get();
      if (doc.exists) {
        let user = {
          id: doc.id,
          ...doc.data(),
        };
        res.send(user);
      } else {
        throw new NotFoundError('Usuário não encontrado!');
      }
    } catch (error) {
      next(error);
    }
  }

  static async save(req: Request, res: Response, next: NextFunction) {
    let user = req.body;
    if (!user.email || user.email.length === 0) {
      throw new ValidationError('E-mail obrigatório!');
    }
    try {
      await getFirestore().collection('users').add(user);
      res.status(201).send({
        message: 'Usuário criado com sucesso!',
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = req.body as User;
      let docRef = getFirestore().collection('users').doc(userId);

      if ((await docRef.get()).exists) {
        await getFirestore().collection('users').doc(userId).set({
          nome: user.nome,
          email: user.email,
        });
        res.send({ message: 'Usuário atualizado com sucesso' });
      } else {
        throw new NotFoundError('Usuário não encontrado!');
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response) {
    const userId = req.params.id;

    try {
      await getFirestore().collection('users').doc(userId).delete();

      res.status(204).end();
    } catch (error) {
      res.status(500).send({ message: 'Erro Interno do Servidor' });
    }
  }
}
