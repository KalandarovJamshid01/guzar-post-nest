import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuartersService } from './quarters.service';
import { CreateQuarterDto } from './dto/create-quarter.dto';
import { UpdateQuarterDto } from './dto/update-quarter.dto';

@Controller('quarters')
export class QuartersController {
  constructor(private readonly quartersService: QuartersService) {}

  @Post()
  create(@Body() createQuarterDto: CreateQuarterDto) {
    return this.quartersService.create(createQuarterDto);
  }

  @Get()
  findAll() {
    return this.quartersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quartersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuarterDto: UpdateQuarterDto) {
    return this.quartersService.update(+id, updateQuarterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quartersService.remove(+id);
  }
}
