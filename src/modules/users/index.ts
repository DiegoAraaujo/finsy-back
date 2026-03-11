import CreateUserUseCase from "./use-cases/CreateUserUseCase";
import CreateUserController from "./controllers/CreateUserController";

import DeleteUserUseCase from "./use-cases/DeleteUserUseCase";
import DeleteUserController from "./controllers/DeleteUserController";

import UpdateUserUseCase from "./use-cases/UpdateUserUseCase";
import UpdateUserController from "./controllers/UpdateUserController";

import UserRepository from "../../repository/UserRepository";
import LoginUseCase from "./use-cases/LoginUseCase";
import LoginController from "./controllers/LoginController";
import RefreshTokenController from "./controllers/RefreshTokenController";
import LogoutController from "./controllers/LogoutController";
import AutoLoginUseCase from "./use-cases/AutoLoginUseCase";
import AutoLoginController from "./controllers/AutoLoginController";

const userRepository = new UserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
export const createUserController = new CreateUserController(createUserUseCase);

const deleteUserUseCase = new DeleteUserUseCase(userRepository);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);

const updateUserUseCase = new UpdateUserUseCase(userRepository);
export const updateUserController = new UpdateUserController(updateUserUseCase);

const loginUseCase = new LoginUseCase(userRepository);
export const loginController = new LoginController(loginUseCase);

const autoLoginUseCase = new AutoLoginUseCase(userRepository);
export const autoLoginController = new AutoLoginController(autoLoginUseCase);

export const refreshTokenController = new RefreshTokenController();
export const logoutController = new LogoutController();
