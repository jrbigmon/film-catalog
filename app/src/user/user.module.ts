import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../database/entities/type.orm.entities';

const models = TypeOrmModule.forFeature(entities);

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
