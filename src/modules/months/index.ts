import MonthRepository from "../../repository/MonthRepository";

import CreateMonthUseCase from "./use-cases/CreateMonthUseCase";
import CreateMonthController from "./controllers/CreateMonthController";

import GetAllMonthsUseCase from "./use-cases/GetAllMonthsUseCase";
import GetAllMonthsController from "./controllers/GetAllMonthsController";

import GetCurrentMonthUseCase from "./use-cases/GetCurrentMonthUseCase";
import GetCurrentMonthController from "./controllers/GetCurrentMonthController";

import GetLatestMonthUseCase from "./use-cases/GetLatestMonthUseCase";
import GetLatestMonthController from "./controllers/GetLatestMonthController";
import CategoryRepository from "../../repository/CategoryRepository";

const monthRepository = new MonthRepository();
const categoryRepository = new CategoryRepository();

const createMonthUseCase = new CreateMonthUseCase(
  monthRepository,
  categoryRepository,
);
export const createMonthController = new CreateMonthController(
  createMonthUseCase,
);

const getAllMonthsUseCase = new GetAllMonthsUseCase(monthRepository);
export const getAllMonthsController = new GetAllMonthsController(
  getAllMonthsUseCase,
);

const getCurrentMonthUseCase = new GetCurrentMonthUseCase(monthRepository);
export const getCurrentMonthController = new GetCurrentMonthController(
  getCurrentMonthUseCase,
);

const getLatestMonthUseCase = new GetLatestMonthUseCase(monthRepository);
export const getLatestMonthController = new GetLatestMonthController(
  getLatestMonthUseCase,
);
