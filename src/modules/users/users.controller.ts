import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { buildQueryManyOptions } from 'src/common/utils/build-query.many-options';
import { query } from 'express';
import { buildQueryOneOptions } from 'src/common/utils/build-query.one-options';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UsersController.name);
  @Post()
  // @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() query: any) {
    const options = buildQueryManyOptions(query, ['full_name', 'email']);
    return await this.usersService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Get('find-one')
  async findOneBy(@Query() query: any) {
    const options = buildQueryOneOptions(query);
    return await this.usersService.findOneBy(options);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
