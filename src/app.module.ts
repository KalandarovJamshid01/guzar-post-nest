import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RegionsModule } from './regions/regions.module';
import { DistrictsModule } from './districts/districts.module';
import { QuartersModule } from './quarters/quarters.module';
import { AdressesModule } from './adresses/adresses.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    RegionsModule,
    DistrictsModule,
    QuartersModule,
    AdressesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
