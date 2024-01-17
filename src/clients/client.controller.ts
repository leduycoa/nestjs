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
  import ClientService from './client.service'
  
  
  @Controller('clients')
  export default class UsersController {
    constructor(private readonly clientService: ClientService) { }
  }
  