import { Injectable } from '@nestjs/common';
import { USERS_DATA } from './user.data';

@Injectable()
export class UsersService {
  sayUser(): string {
    return 'Hello from UsersService';
  }

  getUsers(): ReadonlyArray<any> {
    return USERS_DATA;
  }
}
