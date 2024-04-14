import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryInMemory } from './repository/user.repository.in.memory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryTypeOrm } from './repository/user.repository.type.orm';

const models = TypeOrmModule.forFeature([UserRepositoryTypeOrm]);

@Module({
  imports: [models],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useValue: new UserRepositoryInMemory(),
    },
  ],
  exports: [UserService],
})
export class UserModule {}
