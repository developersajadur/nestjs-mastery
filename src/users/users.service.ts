import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  sayUser(): string {
    return 'Hello from UsersService';
  }

  getUsers(): any[] {
    return [
      { id: 1, name: 'Alice', role: 'admin' },
      { id: 2, name: 'Bob', role: 'user' },
      { id: 3, name: 'Charlie', role: 'user' },
    ];
  }
}
