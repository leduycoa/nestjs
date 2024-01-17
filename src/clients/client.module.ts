import { Module } from '@nestjs/common';
import ClientService from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Client from './entities/client.entity';
import ClientController from './client.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientService],
  exports: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
