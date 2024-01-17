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
import UserService from './user.service';

import JwtAuthenticationGuard from '../guards/jwt-authentication.guard';
import { ExceptionsLoggerFilter } from 'src/utils/exceptionsLogger.filter';
import FindOneParams from 'src/utils/findOneParams';
import CreateUserDto from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param() { id }: FindOneParams) {
    return this.userService.getById(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Put(':id')
  async updateUser(
    @Param() { id }: FindOneParams,
    @Body() user: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param() { id }: FindOneParams) {
    return this.userService.deleteUser(id);
  }
}
