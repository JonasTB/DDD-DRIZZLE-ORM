import { ConflictException, Injectable } from '@nestjs/common'
import { User } from '../../../domain/users/entities/user.entity'
import type { UserRepository } from '../../../infrastructure/repositories/user.repository'
import type { CreateUserDto } from '../dto/create-user.dto'

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

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
      createUserDto.password, // In production, hash the password here
    )

    return this.userRepository.create(userData)
  }
}
