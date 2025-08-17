import { Injectable, NotFoundException } from '@nestjs/common'
import type { User } from '../../../domain/users/entities/user.entity'
import type { UserRepository } from '../../../infrastructure/repositories/user.repository'

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }
}
