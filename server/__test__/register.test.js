const { registerUser } = require('../controllers/authController');
const User = require('../models/user');
const { hashPassword } = require('../helpers/auth');

jest.mock('../models/user', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

jest.mock('../helpers/auth', () => ({
  hashPassword: jest.fn(),
}));

describe('registerUser function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a user successfully', async () => {
    const req = {
      body: {
        name: 'Maxime',
        email: 'maxime@example.com',
        password: 'password123',
      },
    };
    const res = {
      json: jest.fn(),
    };

    User.findOne.mockResolvedValue(null);
    hashPassword.mockResolvedValue('hashedPassword');
    User.create.mockResolvedValue({ _id: 'some_id', name: 'Maxime', email: 'maxime@example.com' });

    await registerUser(req, res);

    expect(res.json).toHaveBeenCalledWith({ _id: 'some_id', name: 'Maxime', email: 'maxime@example.com' });
  });

  it('should return an error if email is already taken', async () => {
    const req = {
      body: {
        name: 'Maxime',
        email: 'maxime@example.com',
        password: 'password123',
      },
    };
    const res = {
      json: jest.fn(),
    };

    User.findOne.mockResolvedValue({ email: 'maxime@example.com' });

    await registerUser(req, res);

    expect(res.json).toHaveBeenCalledWith({ error: 'Email is already taken' });
  });
});
