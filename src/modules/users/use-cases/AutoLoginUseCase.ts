import User from "../../../entities/User";
import { IUserRepository } from "../../../interfaces/IUserRepository";

class AutoLoginUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId: number): Promise<User | null> {
    const user = await this.userRepository.findById(userId);
    return user;
  }
}

export default AutoLoginUseCase;
