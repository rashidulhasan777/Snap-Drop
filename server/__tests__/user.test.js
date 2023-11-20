jest.mock('../models/user/user.model'); // import User model
const User = require('../models/user/user.model');
jest.mock('bcrypt');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken');
const { createUser } = require('../models/user/user.query');
const { SECRET_KEY } = require('../config');

describe('createUser', () => {
  it('should create a user and return an access token', async () => {
    // Test case 1: valid data
    const data = { username: 'testuser', password: 'password123' };
    const expectedToken = 'generated-access-token';
    bcrypt.hash.mockResolvedValue('hashed-password');
    User.create.mockResolvedValue({ _id: { _id: 'user-id' } });
    jwt.sign.mockReturnValue(expectedToken);

    const result = await createUser(data);

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(User.create).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'hashed-password',
    });
    expect(jwt.sign).toHaveBeenCalledWith({ _id: 'user-id' }, SECRET_KEY);
    expect(result).toBe(expectedToken);
  });

  it('should throw an error if password is empty', async () => {
    // Test case 2: empty password
    const data = { username: 'testuser', password: '' };
    const consoleSpy = jest.spyOn(console, 'log');

    await expect(createUser(data)).resolves.toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      new Error("password can't be empty")
    );

    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(User.create).not.toHaveBeenCalled();
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  it('should log error if an error occurs during user creation', async () => {
    // Test case 3: error during user creation
    const data = { username: 'testuser', password: 'password123' };
    bcrypt.hash.mockResolvedValue('hashed-password');
    User.create.mockRejectedValue(new Error('Error creating user'));

    // Spy on console.log
    const consoleSpy = jest.spyOn(console, 'log');

    await createUser(data);

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(User.create).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'hashed-password',
    });
    expect(jwt.sign).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(new Error('Error creating user'));
  });
});
