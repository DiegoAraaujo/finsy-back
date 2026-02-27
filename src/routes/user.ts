import { FastifyInstance } from "fastify";
import { createUserController, deleteUserController } from "../modules/users";
import { CreateUserDTO } from "../modules/users/dtos/CreateUserDTO";

const usersRoutes = async (router: FastifyInstance) => {
  router.post<{ Body: CreateUserDTO }>("/", (req, reply) =>
    createUserController.execute(req, reply),
  );

  router.delete("/", (req, reply) => deleteUserController.execute(req, reply));
};

export default usersRoutes;
