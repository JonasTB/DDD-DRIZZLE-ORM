import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { safeStringify } from '../../../common/utils/logger.utils'
import type { User } from '../../../domain/users/entities/user.entity'
import type { IUserRepository } from '../../../domain/users/repositories/user.repository.interface'
import type { UpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class UpdateUserUseCase {
  private readonly logger = new Logger(UpdateUserUseCase.name)

  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.log(`Updating user with ID: ${id}`)
    this.logger.debug(`Update data: ${safeStringify(updateUserDto)}`)

    const existingUser = await this.userRepository.findById(id)

    if (!existingUser) {
      this.logger.warn(`User not found for update with ID: ${id}`)
      throw new NotFoundException('User not found')
    }

    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      this.logger.log(
        `Checking if email ${updateUserDto.email} is already in use`,
      )
      const userWithEmail = await this.userRepository.findByEmail(
        updateUserDto.email,
      )
      if (userWithEmail) {
        this.logger.warn(`Email ${updateUserDto.email} is already in use`)
        throw new NotFoundException('User with this email already exists')
      }
    }

    const updatedUser = await this.userRepository.update(id, updateUserDto)

    if (!updatedUser) {
      this.logger.error(`Failed to update user with ID: ${id}`)
      throw new NotFoundException('Failed to update user')
    }

    this.logger.log(
      `User updated successfully: ${updatedUser.email} (ID: ${updatedUser.id})`,
    )
    return updatedUser
  }
}
