import User from "../../../entities/User";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import UseCaseError from "../../../interfaces/UseCaseError";
import { generateHash } from "../../../utils/hash";

class CreateUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      const error: UseCaseError = {
        message: "Email already registered",
        errorType: "EMAIL_DUPLICATED",
      };
      throw error;
    }

    const hashedPassword = await generateHash(password);
    const user = new User(name, email, hashedPassword);
    const newUser = await this.userRepository.create(user);
    return newUser;
  }
}

export default CreateUserUseCase;
