import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserCreateDto } from './dto/create-user.dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userCreateDto: UserCreateDto) {
    return this.userService.createUser(userCreateDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
