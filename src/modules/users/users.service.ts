import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('User Repository')
    private readonly userRepository: GenericRepository<User>,
  ) {}
  create(createUserDto: CreateUserDto | CreateUserDto[]) {
    return this.userRepository.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
