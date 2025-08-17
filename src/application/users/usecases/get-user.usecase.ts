import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import type { User } from '../../../domain/users/entities/user.entity'
import type { IUserRepository } from '../../../domain/users/repositories/user.repository.interface'

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }
}
