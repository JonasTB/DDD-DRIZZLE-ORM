import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { CreateUserUseCase } from '../../application/users/usecases/create-user.usecase'
import { GetUserUseCase } from '../../application/users/usecases/get-user.usecase'
import { GetAllUsersUseCase } from '../../application/users/usecases/get-all-users.usecase'
import { UpdateUserUseCase } from '../../application/users/usecases/update-user.usecase'
import { DeleteUserUseCase } from '../../application/users/usecases/delete-user.usecase'
import { UserRepository } from '../../infrastructure/repositories/user.repository'

export const USER_REPOSITORY = 'USER_REPOSITORY'

@Module({
  controllers: [UsersController],
  providers: [
    UserRepository,
    CreateUserUseCase,
    GetUserUseCase,
    GetAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [UserRepository],
})
export class UsersModule {}
