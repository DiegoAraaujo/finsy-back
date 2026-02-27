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
    const validation = loginSchema.safeParse({ email, password });

    if (!validation.success) {
      throw <UseCaseError>{
        message: "Validation error",
        errorType: "VALIDATION_ERROR",
        details: validation.error.issues.map((e) => e.message),
      };
    }

    const data = validation.data;

    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw <UseCaseError>{
        message: "Invalid credentials",
        errorType: "AUTH_ERROR",
      };
    }

    const isPasswordValid = await compareHash(
      data.password,
      user.getPasswordHash(),
    );

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
