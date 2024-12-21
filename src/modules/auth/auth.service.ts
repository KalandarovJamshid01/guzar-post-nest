import { Injectable } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { User } from '../users/entities/user.entity';
import { AuthDto } from './dto/auth-dto';

@Injectable()
export class AuthService {
  // constructor(private readonly userRepository: GenericRepository<User>) {}

   login(authDto: AuthDto) {}
}
