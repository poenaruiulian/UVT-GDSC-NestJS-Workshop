import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  HttpException,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user) {
    return await this.usersService.create(user);
  }

  @Get(':id')
  async getUser(@Param() id) {
    const user = await this.usersService.getUser(id);

    if (!user) {
      throw new HttpException('Error 404, no user found', 404);
    }
    return user;
  }

  @Patch(':id')
  async updateUser(@Param() id, @Body() user) {
    return await this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param() id) {
    return await this.usersService.deleteUser(id);
  }
}
