import { Inject, Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @Inject('Country Repository')
    private readonly countryRepository: GenericRepository<Country>,
  ) {}
  create(createCountryDto: CreateCountryDto) {
    return this.countryRepository.create(createCountryDto);
  }

  findAll() {
    return this.countryRepository.findAll();
  }

  findOne(id: number) {
    return this.countryRepository.findById(id);
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return this.countryRepository.update(id, updateCountryDto);
  }

  remove(id: number) {
    return this.countryRepository.remove(id);
  }
}
