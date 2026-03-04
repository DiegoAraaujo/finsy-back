import Category from "../../../entities/Category";

export const categoryMapper = (category: Category) => {
  return {
    id: category.getId(),
    name: category.getName(),
    spendingLimit: category.getSpendingLimit(),
  };
};
