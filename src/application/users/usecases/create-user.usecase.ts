import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common'
import { safeStringify } from '../../../common/utils/logger.utils'
import { User } from '../../../domain/users/entities/user.entity'
import type { IUserRepository } from '../../../domain/users/repositories/user.repository.interface'
import type { CreateUserDto } from '../dto/create-user.dto'

@Injectable()
export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name)

  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Creating user with email: ${createUserDto.email}`)
    this.logger.debug(`User data: ${safeStringify(createUserDto)}`)

    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    )

    if (existingUser) {
      this.logger.warn(
        `User creation failed - email already exists: ${createUserDto.email}`,
      )
      throw new ConflictException('User with this email already exists')
    }

    const userData = User.create(
      createUserDto.email,
      createUserDto.name,
      createUserDto.password,
    )

    const createdUser = await this.userRepository.create(userData)
    this.logger.log(`User created successfully with ID: ${createdUser.id}`)

    return createdUser
  }
}
