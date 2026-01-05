/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Injectable } from '@nestjs/common';
import { USERS_DATA } from './user.data';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  sayUser(): string {
    return 'Hello from UsersService';
  }

  getUsers(): ReadonlyArray<any> {
    return USERS_DATA;
  }

  async createUser(user: any): Promise<User | any> {
    return this.prisma.user.create({
      data: user,
    });
  }
}
