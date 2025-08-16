import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';
import { User } from '../../../domain/users/entities/user.entity';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
