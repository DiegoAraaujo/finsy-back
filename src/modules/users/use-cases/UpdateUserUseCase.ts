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
        message: "There is no data to update",
        errorType: "VALIDATION_ERROR",
      };
    }

    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw <UseCaseError>{
        message: "User not found",
        errorType: "NOT_FOUND",
      };
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
