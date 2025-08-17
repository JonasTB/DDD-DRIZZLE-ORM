import type { User } from '../entities/user.entity'

export interface IUserRepository {
  create(user: { email: string; name: string; password: string }): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findAll(): Promise<User[]>
  update(id: string, user: Partial<User>): Promise<User | null>
  delete(id: string): Promise<boolean>
}
