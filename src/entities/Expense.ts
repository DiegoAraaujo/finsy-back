import { PaymentMethod } from "@prisma/client";

class Expense {
  private id?: number;
  private userId: number;
  private categoryId: number;
  private snapshotId: number;
  private amount: number;
  private description: string;
  private paymentMethod: PaymentMethod;
  private effectiveFrom: Date;

  constructor(
    userId: number,
    categoryId: number,
    snapshotId: number,
    amount: number,
    description: string,
    paymentMethod: PaymentMethod,
    effectiveFrom: Date,
    id?: number,
  ) {
    this.id = id;
    this.userId = userId;
    this.categoryId = categoryId;
    this.snapshotId = snapshotId;
    this.amount = amount;
    this.description = description;
    this.paymentMethod = paymentMethod;
    this.effectiveFrom = effectiveFrom;
  }

  getId() {
    return this.id;
  }
  getUserId() {
    return this.userId;
  }
  getCategoryId() {
    return this.categoryId;
  }
  getSnapshotId() {
    return this.snapshotId;
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
  getEffectiveFrom() {
    return this.effectiveFrom;
  }
}

export default Expense;
