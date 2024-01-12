import { Module } from '@nestjs/common';
import UsersService from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import Branch from 'src/branch/entities/branch.entity';
import PcUsage from 'src/pcUsage/entities/pcUsage.entity';
import UsersController from './user.controller';
import { BranchModule } from 'src/branch/branch.module';

@Module({
  imports: [BranchModule, TypeOrmModule.forFeature([User, Branch, PcUsage])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
