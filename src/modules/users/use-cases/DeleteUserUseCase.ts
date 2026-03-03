import User from "../../../entities/User";
import { IUserRepository } from "../../../interfaces/IUserRepository";

class DeleteUserUseCase {
  
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async execute(userId: number): Promise<User | null> {
    const deletedUser = await this.userRepository.deleteById(userId);
    return deletedUser;
  }
}

export default DeleteUserUseCase;
