import CategoryRepository from "../../repository/CategoryRepository";

import CreateCategoryUseCase from "./use-cases/CreateCategoryUseCase";
import CreateCategoryController from "./controllers/CreateCategoryController";

import DeleteCategoryUseCase from "./use-cases/DeleteCategoryUseCase";
import DeleteCategoryController from "./controllers/DeleteCategoryController";

import UpdateCategoryUseCase from "./use-cases/UpdateCategoryUseCase";
import UpdateCategoryController from "./controllers/UpdateCategoryController";

import GetCategoriesUseCase from "./use-cases/GetCategoriesUseCase";
import GetCategoriesController from "./controllers/GetCategoriesController";

const categoryRepository = new CategoryRepository();

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
export const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);

const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
export const deleteCategoryController = new DeleteCategoryController(
  deleteCategoryUseCase,
);

const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
export const updateCategoryController = new UpdateCategoryController(
  updateCategoryUseCase,
);

const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
export const getCategoriesController = new GetCategoriesController(
  getCategoriesUseCase,
);
