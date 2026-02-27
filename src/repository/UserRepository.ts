import User from "../entities/User";
import { prisma } from "../lib/prisma";

class UserRepository {
  async create(user: User): Promise<User> {
    const created = await prisma.user.create({ data: user.toPersistence() });
    return new User(
      created.name,
      created.email,
      created.passwordHash,
      created.id,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await prisma.user.findUnique({ where: { email } });
    if (!found) return null;

    return new User(found.name, found.email, found.passwordHash, found.id);
  }

  async deleteById(id: number): Promise<User> {
    const deleted = await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return new User(
      deleted.name,
      deleted.email,
      deleted.passwordHash,
      deleted.id,
    );
  }

  async updateUser(
    userId: number,
    updates: { name?: string; email?: string; passwordHash?: string },
  ): Promise<User> {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: updates,
    });

    return new User(
      updated.name,
      updated.email,
      updated.passwordHash,
      updated.id,
    );
  }
}

export default UserRepository;
