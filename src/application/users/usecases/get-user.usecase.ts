import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import type { User } from '../../../domain/users/entities/user.entity'
import type { IUserRepository } from '../../../domain/users/repositories/user.repository.interface'

@Injectable()
export class GetUserUseCase {
  private readonly logger = new Logger(GetUserUseCase.name)

  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    this.logger.log(`Getting user with ID: ${id}`)

    const user = await this.userRepository.findById(id)

    if (!user) {
      this.logger.warn(`User not found with ID: ${id}`)
      throw new NotFoundException('User not found')
    }

    this.logger.log(`User found: ${user.email} (ID: ${user.id})`)
    return user
  }
}
