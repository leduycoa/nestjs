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
import PcsService from './pc.service';

import JwtAuthenticationGuard from '../guards/jwt-authentication.guard';
import FindOneParams from 'src/utils/findOneParams';
import CreatePcDto from './dto/createPc.dto';
import UpdatePcDto from './dto/updatePc.dto';

@Controller('pcs')
export default class PcsController {
  constructor(private readonly pcsService: PcsService) {}

  @Get()
  getAllPcs() {
    return this.pcsService.getAllPcs();
  }

  @Get(':id')
  getPcById(@Param() { id }: FindOneParams) {
    return this.pcsService.getPcById(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPc(@Body() pc: CreatePcDto) {
    return this.pcsService.create(pc);
  }

  @Put(':id')
  async updatePc(
    @Param() { id }: FindOneParams,
    @Body() pc: UpdatePcDto,
  ) {
    return this.pcsService.updatePc(id, pc);
  }

  @Delete(':id')
  async deletePc(@Param() { id }: FindOneParams) {
    return this.pcsService.deletePc(id);
  }
}
