import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import type { CreateUserDto } from '../../application/users/dto/create-user.dto'
import type { UpdateUserDto } from '../../application/users/dto/update-user.dto'
import { UserResponseDto } from '../../application/users/dto/user-response.dto'
import type { CreateUserUseCase } from '../../application/users/usecases/create-user.usecase'
import type { DeleteUserUseCase } from '../../application/users/usecases/delete-user.usecase'
import type { GetAllUsersUseCase } from '../../application/users/usecases/get-all-users.usecase'
import type { GetUserUseCase } from '../../application/users/usecases/get-user.usecase'
import type { UpdateUserUseCase } from '../../application/users/usecases/update-user.usecase'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject('CREATE_USER_USE_CASE')
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject('GET_USER_USE_CASE')
    private readonly getUserUseCase: GetUserUseCase,
    @Inject('GET_ALL_USERS_USE_CASE')
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    @Inject('UPDATE_USER_USE_CASE')
    private readonly updateUserUseCase: UpdateUserUseCase,
    @Inject('DELETE_USER_USE_CASE')
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.createUserUseCase.execute(createUserDto)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [UserResponseDto],
  })
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.getAllUsersUseCase.execute()
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }))
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.getUserUseCase.execute(id)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.updateUserUseCase.execute(id, updateUserDto)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteUserUseCase.execute(id)
  }
}
