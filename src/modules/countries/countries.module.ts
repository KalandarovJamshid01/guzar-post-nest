import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { GenericRepository } from 'src/common/repositories/generic.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountriesController],
  providers: [
    CountriesService,
    {
      provide: 'Country Repository',
      useFactory: (countryRepository) =>
        new GenericRepository<Country>(countryRepository),
      inject: [getRepositoryToken(Country)],
    },
  ],
})
export class CountriesModule {}
