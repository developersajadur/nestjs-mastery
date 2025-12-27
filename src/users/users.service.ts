import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  sayUser(): string {
    return 'Hello from UsersService';
  }
}
