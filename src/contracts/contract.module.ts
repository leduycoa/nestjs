import { Module } from '@nestjs/common';
import ContractService from './contract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Contract from './entities/contract.entity';
import ContractController from './contract.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Contract])],
  providers: [ContractService],
  exports: [ContractService],
  controllers: [ContractController],
})
export class ContractModule {}
