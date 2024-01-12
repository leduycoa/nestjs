import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PcUsage from 'src/pcUsage/entities/pcUsage.entity';
import Pc from './entities/pcs.entity';
import PcsController from './pcs.controller';
import PcsService from './pc.service';
import Branch from 'src/branch/entities/branch.entity';
import BranchService from 'src/branch/branch.sevice';
import { BranchModule } from 'src/branch/branch.module';

@Module({
  imports: [BranchModule, TypeOrmModule.forFeature([Pc, PcUsage, Branch])],
  providers: [PcsService],
  exports: [PcsService],
  controllers: [PcsController],
})
export class PcsModule {}
