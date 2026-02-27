import User from "../../../entities/User";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import UseCaseError from "../../../interfaces/UseCaseError";
import { updateUserSchema } from "../../../validators/userValidator";

class UpdateUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId: number, name?: string, email?: string): Promise<User> {
    const validation = updateUserSchema.safeParse({ name, email });

    if (!validation.success) {
      throw <UseCaseError>{
        message: "Validation error",
        errorType: "VALIDATION_ERROR",
        details: validation.error.issues.map((e) => e.message),
      };
    }

    const data = validation.data;

    if (data.email) {
      const existingUser = await this.userRepository.findByEmail(data.email);

      if (existingUser && existingUser.getId() !== userId) {
        throw <UseCaseError>{
          message: "Email already registered",
          errorType: "EMAIL_DUPLICATED",
        };
      }
    }

    if (!data.name && !data.email) {
      throw <UseCaseError>{
        message: "There is no data to update",
        errorType: "VALIDATION_ERROR",
      };
    }

    const updatedUser = await this.userRepository.updateUser(userId, {
      name: data.name,
      email: data.email,
    });
    return updatedUser;
  }
}

export default UpdateUserUseCase;
