import { Injectable } from '@nestjs/common'
import type { User } from '../../../domain/users/entities/user.entity'
import type { UserRepository } from '../../../infrastructure/repositories/user.repository'

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll()
  }
}
