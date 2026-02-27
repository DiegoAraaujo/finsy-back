import CreateUserUseCase from "./use-cases/CreateUserUseCase";
import CreateUserController from "./controllers/CreateUserController";

import DeleteUserUseCase from "./use-cases/DeleteUserUseCase";
import DeleteUserController from "./controllers/DeleteUserController";

import UserRepository from "../../repository/UserRepository";

const userRepository = new UserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
export const createUserController = new CreateUserController(createUserUseCase);

const deleteUserUseCase = new DeleteUserUseCase(userRepository);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);
