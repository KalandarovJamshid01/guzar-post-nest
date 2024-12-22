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
@Injectable()
export class AuthService {
  constructor(
    @Inject('User Repository')
    private readonly userRepository: GenericRepository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<User, 'email'>> {
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
    return { email: user.email };
  }

  createToken(email: string, jwtSecret: string, expiresIn: string) {
    return {
      token: this.jwtService.sign({ email }, { secret: jwtSecret, expiresIn }),
    };
  }
  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const validatedEmail = await this.validateUser(email, password);
    return {
      access_token: this.createToken(
        validatedEmail.email,
        process.env.JWT_SECRET_ACCESS,
        process.env.JWT_EXPIRES_IN_ACCESS,
      ).token,
      refresh_token: this.createToken(
        validatedEmail.email,
        process.env.JWT_SECRET_REFRESH,
        process.env.JWT_EXPIRES_IN_REFRESH,
      ).token,
    };
  }
}
