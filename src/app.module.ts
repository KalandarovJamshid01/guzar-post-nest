import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { RegionsModule } from './modules/regions/regions.module';
import { DistrictsModule } from './modules//districts/districts.module';
import { QuartersModule } from './modules/quarters/quarters.module';
import { AdressesModule } from './modules/adresses/adresses.module';
import { StepsModule } from './modules/steps/steps.module';
import { CountriesModule } from './modules/countries/countries.module';
import { AuthModule } from './modules/auth/auth.module';
import { DeliveryPricingModule } from './modules/delivery_pricing/delivery_pricing.module';

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
    DeliveryPricingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
