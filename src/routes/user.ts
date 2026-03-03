import { FastifyInstance } from "fastify";
import {
  createUserController,
  deleteUserController,
  updateUserController,
  loginController,
} from "../modules/users";
import { CreateUserDTO } from "../modules/users/dtos/CreateUserDTO";
import { UpdateUserDTO } from "../modules/users/dtos/UpdateUserDTO";
import { LoginDTO } from "../modules/users/dtos/LoginDTO";
import auth from "../middleware/auth";

const usersRoutes = async (router: FastifyInstance) => {
  router.post<{ Body: CreateUserDTO }>("/", (req, reply) =>
    createUserController.execute(req, reply),
  );

  router.post<{ Body: LoginDTO }>("/login", (req, reply) =>
    loginController.execute(req, reply),
  );

  router.put<{ Body: UpdateUserDTO }>(
    "/",
    { preHandler: [auth] },
    (req, reply) => updateUserController.execute(req, reply),
  );

  router.delete("/", { preHandler: [auth] }, (req, reply) =>
    deleteUserController.execute(req, reply),
  );
};

export default usersRoutes;
