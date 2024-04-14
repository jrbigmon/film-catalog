import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from './repository/user.repository.interface';
import { ExceptionsServices } from '../utils/exceptions/exceptions-services';
import { Crypto } from '../utils/functions/crypto';
import { User } from './entities/user.entity';
import { IFindAllFilters } from '../utils/interfaces/find-all-filters.interface';

@Injectable()
export class UserService {
  constructor(private readonly repository: IUserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    const { username, email, password, name } = updateUserDto;

    const userInDB = await this.repository.findById(id);

    if (!userInDB) {
      throw new ExceptionsServices(
        'User not found',
        HttpStatus.BAD_GATEWAY,
        'id',
      );
    }

    const getUsernameExistent =
      username &&
      this.repository.findByFilterAndDiffValue({ username }, { id });

    const getEmailExistent =
      email && this.repository.findByFilterAndDiffValue({ email }, { id });

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

    const passwordEncrypted = password && Crypto.encrypt(password);

    userInDB.update({ name, email, username, password: passwordEncrypted });

    const userUpdated = await this.repository.update(id, userInDB);

    return userUpdated;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findAll(filters?: IFindAllFilters) {
    return await this.repository.findAll(filters);
  }

  async findOne(id: string) {
    return await this.repository.findById(id);
  }
}
