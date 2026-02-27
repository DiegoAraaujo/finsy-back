import User from "../../../entities/User";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import UseCaseError from "../../../interfaces/UseCaseError";
import { generateHash } from "../../../utils/hash";
import { createUserSchema } from "../../../validators/userValidator";

class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    const validation = createUserSchema.safeParse({ name, email, password });
    if (!validation.success) {
      const error: UseCaseError = {
        message: "Validation error",
        errorType: "VALIDATION_ERROR",
        details: validation.error.issues.map((e) => e.message),
      };
      throw error;
    }

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
