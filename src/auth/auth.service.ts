/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USERS_DATA } from 'src/users/user.data';

@Injectable()
export class AuthService {
  constructor(private readonly wtService: JwtService) {}
  login(email: string, password: string): any {
    const user = USERS_DATA.find((user) => user.email === email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    } else if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.wtService.sign(payload);
    const { password: __, ...safeUser } = user;

    return {
      message: 'Login successful',
      token,
      user: safeUser,
    };
  }
}
