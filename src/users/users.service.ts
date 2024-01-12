import { Roles } from './user.type';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import CreateUserDto from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';
import BranchService from 'src/branch/branch.sevice';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly branchServices: BranchService,
  ) {}

  async getByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      if (user) {
        return user;
      }
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async create(userData: CreateUserDto) {
    try {
      const existBranch = await this.branchServices.getBranchById(
        userData.branchId,
      );
      if (!existBranch.length)
        throw new HttpException(
          `Not found branch with id ${userData.branchId}`,
          HttpStatus.BAD_REQUEST,
        );
      const existEmail = await this.checkEmailExist(userData.email);
      if (existEmail)
        throw new HttpException('This Email is exist!', HttpStatus.BAD_REQUEST);
      const newUser = this.usersRepository.create(userData);
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async checkEmailExist(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async getById(id: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (user) {
        return user;
      }
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async deleteUser(id: string) {
    try {
      await this.getById(id);
      await this.usersRepository.delete(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateUser(id: string, updateBody: UpdateUserDto) {
    try {
      const existBranch = await this.branchServices.getBranchById(
        updateBody.branchId,
      );
      if (!existBranch.length)
        throw new HttpException(
          `Not found branch with id ${updateBody.branchId}`,
          HttpStatus.NOT_FOUND,
        );
      await this.getById(id);
      return this.usersRepository.save({ id, ...updateBody });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // async requestSupportPc(userId: string) {
  //   const currentUser = await this.usersRepository.findOne({
  //     where: { id: userId },
  //   });
  //   if (currentUser.role === Roles. )
  // }
}
