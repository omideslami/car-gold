
export interface Car {
  name: string;
  price: number;
}

export type SavingsUnit = 'toman' | 'gold';

export interface CalculationInput {
  carPrice: number;
  goldPrice: number;
  monthlySavings: number;
  savingsUnit: SavingsUnit;
}

export interface CalculationResult {
  totalGold: number;
  totalMonths: number;
  years: number;
  months: number;
  suggestion: {
    increasedSavings: number; // in gold grams
    newTotalMonths: number;
    timeSavedMonths: number;
  };
}
