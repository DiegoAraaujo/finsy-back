class Category {
  private id?: number;
  private userId: number;
  private name: string;
  private spendingLimit: number;

  constructor(userId: number, id: number, name: string, spendingLimit: number) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.spendingLimit = spendingLimit;
  }

  getId() {
    return this.id;
  }
  getUserId() {
    return this.userId;
  }
  getName() {
    return this.name;
  }
  getSpendingLimit() {
    return this.spendingLimit;
  }
}

export default Category;
