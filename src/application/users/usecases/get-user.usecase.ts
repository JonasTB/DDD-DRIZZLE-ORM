import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';
import { User } from '../../../domain/users/entities/user.entity';

@Injectable()
export class GetUserUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
