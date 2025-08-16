import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';
import { User } from '../../../domain/users/entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findById(id);
    
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Check if email is being updated and if it already exists
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const userWithEmail = await this.userRepository.findByEmail(updateUserDto.email);
      if (userWithEmail) {
        throw new NotFoundException('User with this email already exists');
      }
    }

    const updatedUser = await this.userRepository.update(id, updateUserDto);
    
    if (!updatedUser) {
      throw new NotFoundException('Failed to update user');
    }

    return updatedUser;
  }
}
