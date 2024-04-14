import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  describe('Update', () => {
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
        new User(
          'John Doe',
          'john.doe@mail.com',
          'JohnDoe',
          'any_password',
          '11',
          new Date(),
          new Date(),
        ),
      ]);
      service = new UserService(repository);
    });

    it('should be update a user', async () => {
      const payload: UpdateUserDto = {
        name: 'John Smith',
        username: 'JohnSmith',
        email: 'john@mail.com',
        password: '321',
      };

      const userUpdated = await service.update('10', payload);
      const userInDB = await service.findOne('10');

      expect(userUpdated).toBeTruthy();
      expect(userInDB.getName()).toBe(payload.name);
      expect(userInDB.getUsername()).toBe(payload.username);
      expect(userInDB.getEmail()).toBe(payload.email);
      expect(userInDB.getPassword()).not.toBe(payload.password);
    });

    it('should be not update user when username already exist', async () => {
      const payload: UpdateUserDto = {
        username: 'vagnerJr',
      };

      let userUpdated: boolean = null;
      try {
        userUpdated = await service.update('11', payload);
      } catch (error) {
        expect(error.message).toBe('Username already exists');
      } finally {
        expect(userUpdated).toBeNull();
      }
    });

    it('should be not update user when email already exist', async () => {
      const payload: UpdateUserDto = {
        email: 'john.doe@mail.com',
      };

      let userUpdated: boolean = null;
      try {
        userUpdated = await service.update('10', payload);
      } catch (error) {
        expect(error.message).toBe('Email already exists');
      } finally {
        expect(userUpdated).toBeNull();
      }
    });
  });
});
