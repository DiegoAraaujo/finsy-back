import Category from "../entities/Category";

export interface ICategoryRepository {
  createCategory(category: Category): Promise<Category>;
  deleteCategory(categoryId: number): Promise<void>;
  updateCategory(
    categoryId: number,
    updates: { name?: string; spendingLimit?: number },
  ): Promise<Category>;
  findCategoryByName(name: string, monthId: number): Promise<Category | null>;
  findCategoryById(categoryId: number): Promise<Category | null>;
  findCategoriesByMonthId(monthId: number): Promise<Category[]>;
}
