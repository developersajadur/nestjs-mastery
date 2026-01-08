/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/common/password/password.bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly wtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}
  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmailForLogin(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    } else if (user.isBlocked) {
      throw new UnauthorizedException('User is blocked');
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
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
