class Expense {
  private id?: number;
  private monthId: number;
  private categoryId: number;
  private amount: number;
  private description: string;

  constructor(
    monthId: number,
    categoryId: number,
    amount: number,
    description: string,
    id?: number,
  ) {
    this.categoryId = categoryId;
    this.id = id;
    this.monthId = monthId;
    this.amount = amount;
    this.description = description;
  }

  getId() {
    if (!this.id) {
      throw new Error("Category ID is not defined");
    }
    return this.id;
  }
  getMonthId() {
    return this.monthId;
  }
  getCategoryId() {
    return this.categoryId;
  }
  getAmount() {
    return this.amount;
  }
  getDescription() {
    return this.description;
  }
  toPersistence() {
    return {
      amount: this.amount,
      description: this.description,
      categoryId: this.categoryId,
      monthId: this.monthId,
    };
  }
}

export default Expense;
