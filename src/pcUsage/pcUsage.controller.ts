import {
    Controller,
    Get,
  } from '@nestjs/common';
  import PcUsageService from './pcUsage.service';
  @Controller('pcUsage')
  export default class PcUsageController {
    constructor(private readonly pcUsageService: PcUsageService) {}
  
    @Get()
    getAllPcs() {
      return this.pcUsageService.getAllPcUsage();
    }
  }
  