/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SafeUser } from './user.type';
import { hashPassword } from 'src/common/password/password.bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(user: any): Promise<SafeUser | any> {
    const hashedPassword = await hashPassword(user.password as string);
    return this.prisma.user.create({
      data: {
        ...user,
        id: uuidv4(),
        password: hashedPassword,
      },
    });
  }

  async getUserDataById(userId: string): Promise<SafeUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isBlocked: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    } else if (user?.isBlocked) {
      throw new ForbiddenException('User is blocked');
    }
    return user;
  }

  async getUserByEmailForLogin(email: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
        isBlocked: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    } else if (user?.isBlocked) {
      throw new ForbiddenException('User is blocked');
    }
    return user;
  }
}
