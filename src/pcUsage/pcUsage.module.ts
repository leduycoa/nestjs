import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PcUsage from 'src/pcUsage/entities/pcUsage.entity';
import Pc from 'src/pcs/entities/pcs.entity';
import PcUsageService from './pcUsage.service';
import PcUsageController from './pcUsage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PcUsage, Pc])],
  providers: [PcUsageService],
  exports: [PcUsageService],
  controllers: [PcUsageController],
})
export class PcUsageModule {}
