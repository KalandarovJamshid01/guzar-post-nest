import { Injectable } from '@nestjs/common';
import { CreateQuarterDto } from './dto/create-quarter.dto';
import { UpdateQuarterDto } from './dto/update-quarter.dto';

@Injectable()
export class QuartersService {
  create(createQuarterDto: CreateQuarterDto) {
    return 'This action adds a new quarter';
  }

  findAll() {
    return `This action returns all quarters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quarter`;
  }

  update(id: number, updateQuarterDto: UpdateQuarterDto) {
    return `This action updates a #${id} quarter`;
  }

  remove(id: number) {
    return `This action removes a #${id} quarter`;
  }
}
