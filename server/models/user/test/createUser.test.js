const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser } = require('../user.query');
const User = require('../user.model');
const SECRET_KEY = process.env.JWT_SECRET;


jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../user.model'); 

describe('createUser', () => {
    
    it('should create a new user and return an access token', async () => {
      const data = {
        email: 'testuser@gmail.com',
        password: 'password',
      };
  
      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.create.mockResolvedValue({ _id: '1234567890abcdef1234567890' });
      jwt.sign.mockReturnValue('accessToken');
  
      const access_token = await createUser(data);
  
      expect(access_token).toBe('accessToken');
    });
  
    it('should throw an error if password is empty', async () => {
      const data = {
        email: 'testuser@gmail.com',
        password: '',
      };
  
      try {
        await createUser(data);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
