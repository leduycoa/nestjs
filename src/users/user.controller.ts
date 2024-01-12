import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import UsersService from './users.service';

import JwtAuthenticationGuard from '../guards/jwt-authentication.guard';
import { ExceptionsLoggerFilter } from 'src/utils/exceptionsLogger.filter';
import FindOneParams from 'src/utils/findOneParams';
import CreateUserDto from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param() { id }: FindOneParams) {
    return this.usersService.getById(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Put(':id')
  async updateUser(
    @Param() { id }: FindOneParams,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param() { id }: FindOneParams) {
    return this.usersService.deleteUser(id);
  }
}
