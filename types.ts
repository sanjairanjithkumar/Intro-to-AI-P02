
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export enum Category {
  FOOD = 'Food',
  TRAVEL = 'Travel',
  RENT = 'Rent',
  SHOPPING = 'Shopping',
  EMI = 'EMI',
  ENTERTAINMENT = 'Entertainment',
  HEALTH = 'Health',
  SALARY = 'Salary',
  OTHER = 'Other'
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string;
  note: string;
}

export interface MonthlyStats {
  income: number;
  expenses: number;
  balance: number;
}
