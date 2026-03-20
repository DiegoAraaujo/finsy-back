import User from "../../../entities/User";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import UseCaseError from "../../../interfaces/UseCaseError";

class DeleteUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async execute(userId: number): Promise<void> {
    const existingUser = await this.userRepository.findById(userId);

    if (!existingUser) {
      throw <UseCaseError>{
        message: "User not found",
        errorType: "NOT_FOUND",
      };
    }

    await this.userRepository.deleteById(userId);
  }
}

export default DeleteUserUseCase;
