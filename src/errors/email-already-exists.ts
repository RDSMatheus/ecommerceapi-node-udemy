import { ErrorBase } from './base.error';

export class EmailArealdyExistsError extends ErrorBase {
  constructor(message = 'O email já está sendo utilizado por outra conta!') {
    super(409, message);
  }
}
