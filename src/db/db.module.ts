import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CustomerEntity, SubscriptionEntity, ClaimEntity } from './entities';
import { CustomerRepository, SubscriptionRepository, ClaimRepository } from './repositories';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        synchronize: true,
        entities: [CustomerEntity, SubscriptionEntity, ClaimEntity],
      }),
    }),
    TypeOrmModule.forFeature([CustomerRepository, SubscriptionRepository, ClaimRepository]),
  ],
})
export class DbModule {}
