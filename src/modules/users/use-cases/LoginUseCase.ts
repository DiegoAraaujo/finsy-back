import User from "../../../entities/User";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import UseCaseError from "../../../interfaces/UseCaseError";
import { compareHash } from "../../../utils/hash";
import { loginSchema } from "../../../validators/userValidator";

class LoginUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw <UseCaseError>{
        message: "Invalid credentials",
        errorType: "AUTH_ERROR",
      };
    }

    const isPasswordValid = await compareHash(password, user.getPasswordHash());

    if (!isPasswordValid) {
      throw <UseCaseError>{
        message: "Invalid credentials",
        errorType: "AUTH_ERROR",
      };
    }
    return user;
  }
}

export default LoginUseCase;
