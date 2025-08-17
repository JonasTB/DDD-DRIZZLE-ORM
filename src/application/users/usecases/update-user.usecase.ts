import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import type { User } from '../../../domain/users/entities/user.entity'
import type { IUserRepository } from '../../../domain/users/repositories/user.repository.interface'
import type { UpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findById(id)

    if (!existingUser) {
      throw new NotFoundException('User not found')
    }

    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const userWithEmail = await this.userRepository.findByEmail(
        updateUserDto.email,
      )
      if (userWithEmail) {
        throw new NotFoundException('User with this email already exists')
      }
    }

    const updatedUser = await this.userRepository.update(id, updateUserDto)

    if (!updatedUser) {
      throw new NotFoundException('Failed to update user')
    }

    return updatedUser
  }
}
