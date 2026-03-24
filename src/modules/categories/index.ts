import CategoryRepository from "../../repository/CategoryRepository";

import CreateCategoryUseCase from "./use-cases/CreateCategoryUseCase";
import CreateCategoryController from "./controllers/CreateCategoryController";

import DeleteCategoryUseCase from "./use-cases/DeleteCategoryUseCase";
import DeleteCategoryController from "./controllers/DeleteCategoryController";

import UpdateCategoryUseCase from "./use-cases/UpdateCategoryUseCase";
import UpdateCategoryController from "./controllers/UpdateCategoryController";

import GetCategoriesUseCase from "./use-cases/GetCategoriesUseCase";
import GetCategoriesController from "./controllers/GetCategoriesController";

import GetCategoriesWithExpensesUseCase from "./use-cases/GetCategoriesWithExpensesUseCase";
import GetCategoriesWithExpensesController from "./controllers/GetCategoriesWithExpensesController";
import MonthRepository from "../../repository/MonthRepository";
import GetCategoryByIdUseCase from "./use-cases/GetCategoryByIdUseCase";
import GetCategoryByIdController from "./controllers/GetCategoryByIdController";

const categoryRepository = new CategoryRepository();
const monthRepository = new MonthRepository();

const createCategoryUseCase = new CreateCategoryUseCase(
  categoryRepository,
  monthRepository,
);
export const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);

const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
export const deleteCategoryController = new DeleteCategoryController(
  deleteCategoryUseCase,
);

const updateCategoryUseCase = new UpdateCategoryUseCase(
  categoryRepository,
  monthRepository,
);
export const updateCategoryController = new UpdateCategoryController(
  updateCategoryUseCase,
);

const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
export const getCategoriesController = new GetCategoriesController(
  getCategoriesUseCase,
);

const getCategoriesWithExpensesUseCase = new GetCategoriesWithExpensesUseCase(
  categoryRepository,
);
export const getCategoriesWithExpensesController =
  new GetCategoriesWithExpensesController(getCategoriesWithExpensesUseCase);

const getCategoryByIdUseCase = new GetCategoryByIdUseCase(categoryRepository);
export const getCategoryByIdController = new GetCategoryByIdController(
  getCategoryByIdUseCase,
);
