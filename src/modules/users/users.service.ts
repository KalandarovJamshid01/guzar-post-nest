import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { User } from './entities/user.entity';
import { FindOneOptions } from 'typeorm';
import { hashPassword } from 'src/common/helpers/bcrypt.helper';

@Injectable()
export class UsersService {
  constructor(
    @Inject('User Repository')
    private readonly userRepository: GenericRepository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    createUserDto.password = createUserDto.password
      ? hashPassword(createUserDto.password)
      : createUserDto.password;
    return this.userRepository.create(createUserDto);
  }

  findAll(options) {
    return this.userRepository.findAll(options);
  }

  findById(id: number) {
    return this.userRepository.findById(id);
  }
  findOneBy(options: FindOneOptions) {
    return this.userRepository.findOneBy(options);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.remove(id);
  }
}
