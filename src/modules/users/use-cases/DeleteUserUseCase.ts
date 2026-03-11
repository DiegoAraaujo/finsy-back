import User from "../../../entities/User";
import { IUserRepository } from "../../../interfaces/IUserRepository";

class DeleteUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async execute(userId: number): Promise<void> {
    await this.userRepository.deleteById(userId);
  }
}

export default DeleteUserUseCase;
