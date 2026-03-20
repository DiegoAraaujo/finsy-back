import User from "../../../entities/User";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import UseCaseError from "../../../interfaces/UseCaseError";

class UpdateUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async execute(
    userId: number,
    updates: { name?: string; email?: string },
  ): Promise<User> {
    if (!updates.name && !updates.email) {
      throw <UseCaseError>{
        message: "No data provided to update.",
        errorType: "VALIDATION_ERROR",
      };
    }

    const existingUser = await this.userRepository.findById(userId);

    if (!existingUser) {
      throw <UseCaseError>{
        message: "User not found",
        errorType: "NOT_FOUND",
      };
    }
    if (updates.email) {
      const existingEmail = await this.userRepository.findByEmail(
        updates.email,
      );

      if (existingEmail && existingEmail.getId() !== userId) {
        throw <UseCaseError>{
          message: "Email already registered",
          errorType: "EMAIL_DUPLICATED",
        };
      }
    }

    const dataToUpdate: Partial<{ name?: string; email?: string }> = {};

    if (updates.name) dataToUpdate.name = updates.name;
    if (updates.email) dataToUpdate.email = updates.email;

    const updatedUser = await this.userRepository.updateUser(
      userId,
      dataToUpdate,
    );

    return updatedUser;
  }
}

export default UpdateUserUseCase;
