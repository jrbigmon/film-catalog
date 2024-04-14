import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryInMemory } from './repository/user.repository.in.memory';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useValue: new UserRepositoryInMemory(),
    },
  ],
})
export class UserModule {}
