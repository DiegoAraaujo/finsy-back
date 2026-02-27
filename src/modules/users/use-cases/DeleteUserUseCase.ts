import User from "../../../entities/User";
import { IUserRepository } from "../../../interfaces/IUserRepository";

class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: number): Promise<User> {
    const deletedUser = await this.userRepository.deleteById(userId);
    return deletedUser;
  }
}

export default DeleteUserUseCase;
