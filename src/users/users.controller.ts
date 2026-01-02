import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/get-user')
  sayUser(): string {
    return this.userService.sayUser();
  }

  @Get('/list')
  getUsers(): any[] {
    return this.userService.getUsers();
  }
}
