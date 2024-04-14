import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from './repository/user.repository.interface';
import { ExceptionsServices } from '../utils/exceptions/exceptions-services';
import { Crypto } from '../utils/functions/crypto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly repository: IUserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { name, password, username, email } = createUserDto;

    const getUsernameExistent = this.repository.findByFilter({
      username,
    });

    const getEmailExistent = this.repository.findByFilter({ email });

    const [usernameExists, emailExists] = await Promise.all([
      getUsernameExistent,
      getEmailExistent,
    ]);

    if (usernameExists) {
      throw new ExceptionsServices(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
        'username',
      );
    }

    if (emailExists) {
      throw new ExceptionsServices(
        'Email already exists',
        HttpStatus.BAD_REQUEST,
        'email',
      );
    }

    const passwordEncrypted = Crypto.encrypt(password);

    const newUser = new User(name, email, username, passwordEncrypted);

    const userCreated = await this.repository.create(newUser);

    return userCreated;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
