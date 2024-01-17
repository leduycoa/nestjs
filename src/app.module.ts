import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import DatabaseModule from './database/database.module';
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
import { APP_FILTER } from '@nestjs/core';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './users/user.module';
import { ClientModule } from './clients/client.module';
import { ContractModule } from './contracts/contract.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    AuthenticationModule,
    DatabaseModule,
    UserModule,
    ClientModule,
    ContractModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {}
