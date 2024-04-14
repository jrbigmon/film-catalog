import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryTypeOrm } from './repository/user.repository.type.orm';
import { UserRepository } from './repository/user.repository';

const models = TypeOrmModule.forFeature([UserRepositoryTypeOrm]);

@Module({
  imports: [models],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: 'UserRepository',
      useExisting: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
