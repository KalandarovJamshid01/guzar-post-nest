import {
  BadRequestException,
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
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    @Inject('User Repository')
    private readonly userRepository: GenericRepository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
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

  async oneId(
    code: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const token = await lastValueFrom(
        this.httpService.get(
          `https://sso.egov.uz/sso/oauth/Authorization.do?grant_type=one_authorization_code&client_id=${this.configService.get('ONEIDCLIENTID')}&client_secret=${this.configService.get('ONEIDCLIENTSECRET')}&code=${code}&redirect_uri=${this.configService.get('SERVERURL')}`,
        ),
      );
      const oneIdUser = await lastValueFrom(
        this.httpService.get(
          `https://sso.egov.uz/sso/oauth/Authorization.do?grant_type=one_access_token_identify&client_id=${this.configService.get('ONEIDCLIENTID')}&client_secret=${this.configService.get('ONEIDCLIENTSECRET')}&access_token=${token.data.access_token}&scope=${this.configService.get('ONEIDSCOPE')}`,
        ),
      );
      const user = await this.userRepository.findOneBy({
        where: { pin: oneIdUser.data.pin },
      });
      let newUser: User;
      const data: CreateUserDto = oneIdUser.data;
      if (!user) {
        const result = await this.userRepository.create(data);
        if ('data' in result && result.data) {
          throw new BadRequestException();
        }
        newUser = result as User;
      } else {
        newUser = await this.userRepository.update(user.id, oneIdUser.data);
      }

      return {
        access_token: this.generateToken(newUser, 'access'),
        refresh_token: this.generateToken(newUser, 'refresh'),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid code', error);
    }
  }
}
