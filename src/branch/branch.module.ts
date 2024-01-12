import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Branch from './entities/branch.entity';
import User from 'src/users/entities/user.entity';
import BranchService from './branch.sevice';
import BranchController from './branch.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, User])],
  providers: [BranchService],
  exports: [BranchService],
  controllers: [BranchController],
})
export class BranchModule {}
