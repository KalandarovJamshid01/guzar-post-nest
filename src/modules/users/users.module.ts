import { GenericRepository } from 'src/common/repositories/generic.repository';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // User entitiyasini import qilish
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'User Repository',
      useFactory: (userRepository) =>
        new GenericRepository<User>(userRepository),
      inject: [getRepositoryToken(User)], // UserRepository ni to'g'ri inject qilish
    },
  ],
  exports: ['User Repository'], // UserRepository ni eksport qilish
})
export class UsersModule {}

// @Module({
//   imports: [TypeOrmModule.forFeature([User])],
//   controllers: [UsersController],
//   providers: [
//     UsersService,
//     {
//       provide: 'UserRepository',
//       useFactory: (userRepository) =>
//         new GenericRepository<User>(userRepository),
//       inject: [getRepositoryToken(User)],
//     },
//   ],
//   exports: ['UserRepository'],
// })
// export class UsersModule {}
