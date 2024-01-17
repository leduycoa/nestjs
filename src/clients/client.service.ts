import { Client } from './entities/client.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(Client)
    private usersRepository: Repository<Client>,
  ) {}

}
