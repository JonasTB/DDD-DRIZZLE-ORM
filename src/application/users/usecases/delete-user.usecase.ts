import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    const existingUser = await this.userRepository.findById(id);
    
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const deleted = await this.userRepository.delete(id);
    
    if (!deleted) {
      throw new NotFoundException('Failed to delete user');
    }

    return deleted;
  }
}
