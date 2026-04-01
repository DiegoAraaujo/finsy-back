import { PaymentMethod } from "@prisma/client";

class Expense {
  private id?: number;
  private monthId: number;
  private categoryId: number;
  private amount: number;
  private paymentMethod: PaymentMethod;
  private description: string | null;
  private createdAt?: Date;

  constructor(
    monthId: number,
    categoryId: number,
    amount: number,
    paymentMethod: PaymentMethod,
    description: string | null,
    createdAt?: Date,
    id?: number,
  ) {
    this.categoryId = categoryId;
    this.id = id;
    this.monthId = monthId;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.description = description;
    this.createdAt = createdAt;
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

  getPaymentMethod() {
    return this.paymentMethod;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  toPersistence() {
    return {
      amount: this.amount,
      description: this.description,
      categoryId: this.categoryId,
      monthId: this.monthId,
      paymentMethod: this.paymentMethod,
      createdAt: this.createdAt,
    };
  }
}

export default Expense;
