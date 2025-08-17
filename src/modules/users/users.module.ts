import { Module } from '@nestjs/common'
import { CreateUserUseCase } from '../../application/users/usecases/create-user.usecase'
import { DeleteUserUseCase } from '../../application/users/usecases/delete-user.usecase'
import { GetAllUsersUseCase } from '../../application/users/usecases/get-all-users.usecase'
import { GetUserUseCase } from '../../application/users/usecases/get-user.usecase'
import { UpdateUserUseCase } from '../../application/users/usecases/update-user.usecase'
import { UserRepository } from '../../infrastructure/repositories/user.repository'
import { UsersController } from './users.controller'

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepository,
    },
    {
      provide: 'CREATE_USER_USE_CASE',
      useClass: CreateUserUseCase,
    },
    {
      provide: 'GET_USER_USE_CASE',
      useClass: GetUserUseCase,
    },
    {
      provide: 'GET_ALL_USERS_USE_CASE',
      useClass: GetAllUsersUseCase,
    },
    {
      provide: 'UPDATE_USER_USE_CASE',
      useClass: UpdateUserUseCase,
    },
    {
      provide: 'DELETE_USER_USE_CASE',
      useClass: DeleteUserUseCase,
    },
  ],
  exports: ['USER_REPOSITORY'],
})
export class UsersModule {}
