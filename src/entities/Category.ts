class Category {
  private id?: number;
  private monthId: number;
  private name: string;
  private spendingLimit: number;

  constructor(
    monthId: number,
    name: string,
    spendingLimit: number,
    id?: number,
  ) {
    this.id = id;
    this.monthId = monthId;
    this.name = name;
    this.spendingLimit = spendingLimit;
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
  getName() {
    return this.name;
  }
  getSpendingLimit() {
    return this.spendingLimit;
  }
  toPersistence() {
    return {
      name: this.name,
      spendingLimit: this.spendingLimit,
      monthId: this.monthId,
    };
  }
}

export default Category;
