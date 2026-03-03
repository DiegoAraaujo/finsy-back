import User from "../../../entities/User";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import UseCaseError from "../../../interfaces/UseCaseError";

class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: number, name?: string, email?: string): Promise<User> {
    if (!name && !email) {
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

    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;

    const updatedUser = await this.userRepository.updateUser(
      userId,
      dataToUpdate,
    );

    return updatedUser;
  }
}

export default UpdateUserUseCase;
