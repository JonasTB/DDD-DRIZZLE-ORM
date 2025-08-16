import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CreateUserUseCase } from '@application/users/usecases/create-user.usecase';
import { GetUserUseCase } from '@application/users/usecases/get-user.usecase';
import { GetAllUsersUseCase } from '@application/users/usecases/get-all-users.usecase';
import { UpdateUserUseCase } from '@application/users/usecases/update-user.usecase';
import { DeleteUserUseCase } from '@application/users/usecases/delete-user.usecase';
import { CreateUserDto } from '@application/users/dto/create-user.dto';
import { UpdateUserDto } from '@application/users/dto/update-user.dto';
import { User } from '@domain/users/entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let createUserUseCase: CreateUserUseCase;
  let getUserUseCase: GetUserUseCase;
  let getAllUsersUseCase: GetAllUsersUseCase;
  let updateUserUseCase: UpdateUserUseCase;
  let deleteUserUseCase: DeleteUserUseCase;

  const mockUser = new User(
    'test-id',
    'test@example.com',
    'Test User',
    'password123',
    new Date(),
    new Date(),
  );

  const mockCreateUserUseCase = {
    execute: jest.fn(),
  };

  const mockGetUserUseCase = {
    execute: jest.fn(),
  };

  const mockGetAllUsersUseCase = {
    execute: jest.fn(),
  };

  const mockUpdateUserUseCase = {
    execute: jest.fn(),
  };

  const mockDeleteUserUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: mockCreateUserUseCase,
        },
        {
          provide: GetUserUseCase,
          useValue: mockGetUserUseCase,
        },
        {
          provide: GetAllUsersUseCase,
          useValue: mockGetAllUsersUseCase,
        },
        {
          provide: UpdateUserUseCase,
          useValue: mockUpdateUserUseCase,
        },
        {
          provide: DeleteUserUseCase,
          useValue: mockDeleteUserUseCase,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    getUserUseCase = module.get<GetUserUseCase>(GetUserUseCase);
    getAllUsersUseCase = module.get<GetAllUsersUseCase>(GetAllUsersUseCase);
    updateUserUseCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      jest.spyOn(createUserUseCase, 'execute').mockResolvedValue(mockUser);

      const result = await controller.create(createUserDto);

      expect(createUserUseCase.execute).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [mockUser];
      jest.spyOn(getAllUsersUseCase, 'execute').mockResolvedValue(users);

      const result = await controller.findAll();

      expect(getAllUsersUseCase.execute).toHaveBeenCalled();
      expect(result).toEqual(users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })));
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const userId = 'test-id';
      jest.spyOn(getUserUseCase, 'execute').mockResolvedValue(mockUser);

      const result = await controller.findOne(userId);

      expect(getUserUseCase.execute).toHaveBeenCalledWith(userId);
      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
      });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = 'test-id';
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };

      jest.spyOn(updateUserUseCase, 'execute').mockResolvedValue(mockUser);

      const result = await controller.update(userId, updateUserDto);

      expect(updateUserUseCase.execute).toHaveBeenCalledWith(userId, updateUserDto);
      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
      });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const userId = 'test-id';
      jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValue(true);

      await controller.remove(userId);

      expect(deleteUserUseCase.execute).toHaveBeenCalledWith(userId);
    });
  });
});
