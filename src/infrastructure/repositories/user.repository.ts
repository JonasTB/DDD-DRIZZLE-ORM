import { Inject, Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { User } from '../../domain/users/entities/user.entity'
import type { IUserRepository } from '../../domain/users/repositories/user.repository.interface'
import { users } from '../database/schema/users.schema'

const DATABASE = 'DATABASE'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject(DATABASE) private readonly db: PostgresJsDatabase) {}

  async create(user: {
    email: string
    name: string
    password: string
  }): Promise<User> {
    const [newUser] = await this.db
      .insert(users)
      .values({
        email: user.email,
        name: user.name,
        password: user.password,
      })
      .returning()

    return new User(
      newUser.id,
      newUser.email,
      newUser.name,
      newUser.password,
      newUser.createdAt,
      newUser.updatedAt,
    )
  }

  async findById(id: string): Promise<User | null> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id))

    if (!user) return null

    return new User(
      user.id,
      user.email,
      user.name,
      user.password,
      user.createdAt,
      user.updatedAt,
    )
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))

    if (!user) return null

    return new User(
      user.id,
      user.email,
      user.name,
      user.password,
      user.createdAt,
      user.updatedAt,
    )
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.db.select().from(users)

    return allUsers.map(
      (user) =>
        new User(
          user.id,
          user.email,
          user.name,
          user.password,
          user.createdAt,
          user.updatedAt,
        ),
    )
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const updateData: {
      email?: string
      name?: string
      password?: string
      updatedAt: Date
    } = {
      updatedAt: new Date(),
    }

    if (user.email !== undefined) updateData.email = user.email
    if (user.name !== undefined) updateData.name = user.name
    if (user.password !== undefined) updateData.password = user.password

    const [updatedUser] = await this.db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning()

    if (!updatedUser) return null

    return new User(
      updatedUser.id,
      updatedUser.email,
      updatedUser.name,
      updatedUser.password,
      updatedUser.createdAt,
      updatedUser.updatedAt,
    )
  }

  async delete(id: string): Promise<boolean> {
    const [deletedUser] = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning()

    return !!deletedUser
  }
}
