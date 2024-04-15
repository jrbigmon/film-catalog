import { User } from './user.entity';

describe('User', () => {
  describe('Create a new user', () => {
    it('should create a new user instance', () => {
      const user = User.create({
        name: 'John Doe',
        email: 'jhon.doe@gmail.com',
        username: 'jhon.doe@gmail.com',
        password: 'password',
      });

      expect(user).not.toBeNull();
      expect(user.getId()).not.toBeNull();
    });
  });
});
