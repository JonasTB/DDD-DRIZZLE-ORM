import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import type { IUserRepository } from '../../../domain/users/repositories/user.repository.interface'

@Injectable()
export class DeleteUserUseCase {
  private readonly logger = new Logger(DeleteUserUseCase.name)

  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    this.logger.log(`Deleting user with ID: ${id}`)

    const existingUser = await this.userRepository.findById(id)

    if (!existingUser) {
      this.logger.warn(`User not found for deletion with ID: ${id}`)
      throw new NotFoundException('User not found')
    }

    this.logger.log(
      `Found user to delete: ${existingUser.email} (ID: ${existingUser.id})`,
    )

    const deleted = await this.userRepository.delete(id)

    if (!deleted) {
      this.logger.error(`Failed to delete user with ID: ${id}`)
      throw new NotFoundException('Failed to delete user')
    }

    this.logger.log(
      `User deleted successfully: ${existingUser.email} (ID: ${existingUser.id})`,
    )
    return deleted
  }
}
