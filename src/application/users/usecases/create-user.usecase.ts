import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { User } from '../../../domain/users/entities/user.entity'
import type { IUserRepository } from '../../../domain/users/repositories/user.repository.interface'
import type { CreateUserDto } from '../dto/create-user.dto'

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    )

    if (existingUser) {
      throw new ConflictException('User with this email already exists')
    }

    const userData = User.create(
      createUserDto.email,
      createUserDto.name,
      createUserDto.password,
    )

    return this.userRepository.create(userData)
  }
}
