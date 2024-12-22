import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { User } from '../users/entities/user.entity';
import { AuthDto } from './dto/auth-dto';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    @Inject('User Repository')
    private readonly userRepository: GenericRepository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      where: { email: email },
    });
    if (!user) {
      throw new UnauthorizedException("This user doesn't exist");
    }
    const isCorrectPassword = compareSync(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('The Password is wrong!');
    }
    return user;
  }

  private generateToken(user: User, type: 'access' | 'refresh') {
    const { id, email, role } = user;
    const secretKey = this.configService.get(
      type === 'access' ? 'JWT_SECRET_ACCESS' : 'JWT_SECRET_REFRESH',
    );
    const expiresIn = this.configService.get(
      type === 'access' ? 'JWT_EXPIRES_IN_ACCESS' : 'JWT_EXPIRES_IN_REFRESH',
    );
    return this.jwtService.sign(
      { id, email, role },
      { secret: secretKey, expiresIn },
    );
  }
  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.validateUser(email, password);
    return {
      access_token: this.generateToken(user, 'access'),
      refresh_token: this.generateToken(user, 'refresh'),
    };
  }
}
