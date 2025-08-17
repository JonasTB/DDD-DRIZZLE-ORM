import { Inject, Injectable } from '@nestjs/common'
import type { User } from '../../../domain/users/entities/user.entity'
import type { IUserRepository } from '../../../domain/users/repositories/user.repository.interface'

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll()
  }
}
