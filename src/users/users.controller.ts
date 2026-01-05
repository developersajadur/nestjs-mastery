/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/get-user')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  getUser(@Req() req) {
    return req.user;
  }

  @Get('/list')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getUsers(): ReadonlyArray<any> {
    return this.userService.getUsers();
  }

  @Post('/create')
  async createUser(@Req() req) {
    return this.userService.createUser(req.body);
  }
}
