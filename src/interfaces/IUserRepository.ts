import User from "../entities/User";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(userId: number): Promise<User | null>;
  deleteById(id: number): Promise<User | null>;
  updateUser(
    userId: number,
    updates: { name?: string; email?: string; passwordHash?: string },
  ): Promise<User>;
}
