import { Inject, Injectable, Logger } from '@nestjs/common'
import type { User } from '../../../domain/users/entities/user.entity'
import type { IUserRepository } from '../../../domain/users/repositories/user.repository.interface'

@Injectable()
export class GetAllUsersUseCase {
  private readonly logger = new Logger(GetAllUsersUseCase.name)

  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    this.logger.log('Getting all users')

    const users = await this.userRepository.findAll()

    this.logger.log(`Found ${users.length} users`)
    return users
  }
}
