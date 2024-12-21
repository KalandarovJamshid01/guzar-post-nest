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
import { buildQueryOption } from 'src/common/utils/builder-query.options';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UsersController.name);
  @Post()
  // @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const options = buildQueryOption(query, ['full_name', 'email']);
    return this.usersService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
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
