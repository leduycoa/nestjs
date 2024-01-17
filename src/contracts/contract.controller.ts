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
  import ContractService from './contract.service';
  
  import JwtAuthenticationGuard from '../guards/jwt-authentication.guard';
  import { ExceptionsLoggerFilter } from 'src/utils/exceptionsLogger.filter';
  import FindOneParams from 'src/utils/findOneParams';

  @Controller('contracts')
  export default class UserController {
    constructor(private readonly contractService: ContractService) { }
  }
  