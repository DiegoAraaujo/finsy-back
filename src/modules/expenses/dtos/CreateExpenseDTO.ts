import { PaymentMethod } from "@prisma/client";

export interface CreateExpenseDTO {
  amount: number;
  paymentMethod: PaymentMethod;
  description?: string;
}
