import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import type { IUserRepository } from '../../../domain/users/repositories/user.repository.interface'

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    const existingUser = await this.userRepository.findById(id)

    if (!existingUser) {
      throw new NotFoundException('User not found')
    }

    const deleted = await this.userRepository.delete(id)

    if (!deleted) {
      throw new NotFoundException('Failed to delete user')
    }

    return deleted
  }
}
