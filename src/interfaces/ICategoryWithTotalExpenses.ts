export interface ICategoryWithTotalExpenses {
  id: number;
  name: string;
  monthId: number;
  spendingLimit: number;
  totalExpenses: number;
}