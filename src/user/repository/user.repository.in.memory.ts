import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { IFindByFilter } from '../../utils/interfaces/find-by-filters.interface';
import { User } from '../entities/user.entity';
import { IUserRepository } from './user.repository.interface';

export class UserRepositoryInMemory implements IUserRepository {
  fakeDatabase = new Array<User>();

  constructor(listOfUsers?: Array<User>) {
    if (listOfUsers) {
      this.fakeDatabase = listOfUsers;
    }
  }

  async findByFilter(filter: IFindByFilter): Promise<User> {
    if (!filter) {
      return null;
    }

    const filterValue = Object.values(filter)?.[0];
    const key = Object.keys(filter)?.[0];

    const user = this.fakeDatabase
      .map((user) => user.toJSON())
      ?.find((user) => user[key] === filterValue);

    if (!user) return null;

    return this.fakeDatabase.find((userInDB) => userInDB.getId() === user.id);
  }

  async findById(id: string): Promise<User> {
    return this.fakeDatabase.find(
      (user) => user.getId() === id && !user.getDeletedAt(),
    );
  }

  async findAll(filters: IFindAllFilters): Promise<User[]> {
    return this.fakeDatabase.filter((user) => !user.getDeletedAt());
  }

  async create(user: User): Promise<User> {
    user.setCreatedAt(new Date());
    user.setUpdatedAt(new Date());

    this.fakeDatabase.push(user);

    return user;
  }

  async update(id: string, user: User): Promise<boolean> {
    const userInDBIndex = this.fakeDatabase.findIndex(
      (user) => user.getId() === id,
    );

    if (userInDBIndex === -1) return false;

    user.setUpdatedAt(new Date());

    this.fakeDatabase[userInDBIndex] = user;

    return true;
  }

  async delete(id: string): Promise<void> {
    const userInDB = this.fakeDatabase.find(
      (movieGenre) => movieGenre.getId() === id,
    );

    if (userInDB) {
      userInDB.setDeletedAt(new Date());
    }
  }
}
