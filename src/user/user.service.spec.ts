import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepositoryInMemory } from './repository/user.repository.in.memory';
import { IUserRepository } from './repository/user.repository.interface';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: IUserRepository;

  describe('Create', () => {
    beforeEach(() => {
      repository = new UserRepositoryInMemory([
        new User(
          'Vagner',
          'vagner@mail.com',
          'vagnerJr',
          '123',
          '10',
          new Date(),
          new Date(),
        ),
      ]);
      service = new UserService(repository);
    });

    it('should be create a new user', async () => {
      const payload: CreateUserDto = {
        name: 'John Doe',
        email: 'john@doe.com',
        username: 'doe@doe.com',
        password: '123',
      };

      const userCreated = await service.create(payload);

      expect(userCreated).not.toBeNull();
      expect(userCreated.getId).not.toBeNull();
      expect(userCreated.getPassword()).not.toBe('123');
    });

    it('should be not create a new user when the username already exists', async () => {
      const payload: CreateUserDto = {
        name: 'Vagner Doe jr',
        email: 'vagner@doe.com',
        username: 'vagnerJr',
        password: '123',
      };

      let result: User;
      try {
        result = await service.create(payload);
      } catch (error) {
        expect(error.message).toBe('Username already exists');
      } finally {
        expect(result).toBeUndefined();
      }
    });

    it('should be not create a new user when the email already exists', async () => {
      const payload: CreateUserDto = {
        name: 'Vagner Doe jr',
        email: 'vagner@mail.com',
        username: 'vagnerDoe',
        password: '123',
      };

      let result: User;
      try {
        result = await service.create(payload);
      } catch (error) {
        expect(error.message).toBe('Email already exists');
      } finally {
        expect(result).toBeUndefined();
      }
    });
  });
});
