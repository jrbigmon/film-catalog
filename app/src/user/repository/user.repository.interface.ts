import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { IFindByFilter } from '../../utils/interfaces/find-by-filters.interface';
import { User } from '../entities/user.entity';

export interface IUserRepository {
  findById(id: string): Promise<User>;
  findByFilter(filter: IFindByFilter): Promise<User>;
  findAll(filters: IFindAllFilters): Promise<User[]>;
  create(user: User): Promise<User>;
  update(id: string, user: User): Promise<boolean>;
  delete(id: string): Promise<void>;
  findByFilterAndDiffValue(
    filter?: IFindByFilter,
    diffValue?: IFindByFilter,
  ): Promise<User>;
}
