import Category from "../entities/Category";
import { ICategoryRepository } from "../interfaces/ICategoryRepository";
import { prisma } from "../lib/prisma";

class CategoryRepository implements ICategoryRepository {
  async createCategory(category: Category): Promise<Category> {
    const created = await prisma.category.create({
      data: category.toPersistence(),
    });
    return new Category(
      created.monthId,
      created.name,
      created.spendingLimit.toNumber(),
      created.id,
    );
  }

  async updateCategory(
    categoryId: number,
    updates: {
      name?: string;
      spendingLimit?: number;
    },
  ): Promise<Category> {
    const updated = await prisma.category.update({
      where: { id: categoryId, deletedAt: null },
      data: { ...updates },
    });

    return new Category(
      updated.monthId,
      updated.name,
      updated.spendingLimit.toNumber(),
      updated.id,
    );
  }

  async deleteCategory(categoryId: number): Promise<void> {
    const now = new Date();

    await prisma.$transaction([
      prisma.category.update({
        where: { id: categoryId },
        data: { deletedAt: now },
      }),
      prisma.expense.updateMany({
        where: { categoryId, deletedAt: null },
        data: { deletedAt: now },
      }),
    ]);
  }

  async findCategoryByName(
    name: string,
    monthId: number,
  ): Promise<Category | null> {
    const category = await prisma.category.findFirst({
      where: {
        deletedAt: null,
        monthId,
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    return category
      ? new Category(
          category.monthId,
          category.name,
          category.spendingLimit.toNumber(),
          category.id,
        )
      : null;
  }

  async findCategoryById(categoryId: number): Promise<Category | null> {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        deletedAt: null,
      },
    });

    return category
      ? new Category(
          category.monthId,
          category.name,
          category.spendingLimit.toNumber(),
          category.id,
        )
      : null;
  }

  async findCategoriesByMonthId(monthId: number) {
    return await prisma.category.findMany({ where: { monthId } });
  }
}

export default CategoryRepository;
