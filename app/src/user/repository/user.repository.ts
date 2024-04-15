import { Not, Repository } from 'typeorm';
import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { IFindByFilter } from '../../utils/interfaces/find-by-filters.interface';
import { User } from '../entities/user.entity';
import { IUserRepository } from './user.repository.interface';
import { UserRepositoryTypeOrm } from './user.repository.type.orm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserRepositoryTypeOrm)
    private userRepository: Repository<UserRepositoryTypeOrm>,
  ) {}

  private mountUser(userRepository: UserRepositoryTypeOrm): User {
    if (!userRepository) return null;

    const {
      id,
      name,
      username,
      email,
      password,
      createdAt,
      deletedAt,
      updatedAt,
    } = userRepository;

    return new User(
      name,
      email,
      username,
      password,
      id,
      createdAt,
      updatedAt,
      deletedAt,
    );
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    return this.mountUser(user);
  }

  async findByFilter(filter: IFindByFilter): Promise<User> {
    const user = await this.userRepository.findOne(filter);

    return this.mountUser(user);
  }

  async findAll(filters: IFindAllFilters): Promise<User[]> {
    const users = await this.userRepository.find(filters.filters);

    if (!users?.length) return [];

    return users?.map((user) => this.mountUser(user));
  }

  async create(user: User): Promise<User> {
    const userCreated = await this.userRepository.save({ ...user });

    return this.mountUser(userCreated);
  }

  async update(id: string, user: User): Promise<boolean> {
    const userUpdated = await this.userRepository.update(id, { ...user });

    return userUpdated?.affected > 0;
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByFilterAndDiffValue(
    filter?: IFindByFilter,
    diffValue?: IFindByFilter,
  ): Promise<User> {
    const notOperator = Object.entries(diffValue).map(([key, value]) => {
      return {
        [key]: Not(value),
      };
    });

    const user = await this.userRepository.findOneBy({
      ...filter,
      ...notOperator,
    });

    return this.mountUser(user);
  }
}
