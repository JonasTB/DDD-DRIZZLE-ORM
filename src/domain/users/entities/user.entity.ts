export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(
    email: string,
    name: string,
    password: string,
  ): { email: string; name: string; password: string } {
    return {
      email,
      name,
      password,
    };
  }

  updateName(name: string): User {
    return new User(
      this.id,
      this.email,
      name,
      this.password,
      this.createdAt,
      new Date(),
    );
  }

  updateEmail(email: string): User {
    return new User(
      this.id,
      email,
      this.name,
      this.password,
      this.createdAt,
      new Date(),
    );
  }
}
