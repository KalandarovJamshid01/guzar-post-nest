import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RegionsModule } from './regions/regions.module';
import { DistrictsModule } from './districts/districts.module';
import { QuartersModule } from './quarters/quarters.module';
import { AdressesModule } from './adresses/adresses.module';
import { StepsModule } from './steps/steps.module';
import { CountriesModule } from './countries/countries.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    RegionsModule,
    DistrictsModule,
    QuartersModule,
    AdressesModule,
    StepsModule,
    CountriesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
