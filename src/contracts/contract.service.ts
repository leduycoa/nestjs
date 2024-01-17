import  Contract  from './entities/contract.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export default class ContractService {
  constructor(
    @InjectRepository(Contract)
    private usersRepository: Repository<Contract>,
  ) {}

}
