import { PaymentMethod } from "@prisma/client";

export interface updateExpenseDTO {
  amount?: number;
  paymentMethod?: PaymentMethod;
  description?: string;
}
