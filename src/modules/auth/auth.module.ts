import { GenericRepository } from 'src/common/repositories/generic.repository';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/entities/user.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtSrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_ACCESS'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN_ACCESS'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'User Repository',
      useFactory: (userRepository) =>
        new GenericRepository<User>(userRepository),
      inject: [getRepositoryToken(User)], // UserRepository ni to'g'ri inject qilish
    },
    JwtSrategy,
  ],
  exports: ['User Repository', JwtSrategy],
})
export class AuthModule {}
