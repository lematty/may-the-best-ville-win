import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {
  calculateInterest(loanAmount: number, duration: number, interestRate: number): { monthlyPayment: number, totalInterest: number } {
    const interestAsPercentage = interestRate / 100;
    const top = loanAmount * (interestAsPercentage / 12);
    const bottom = 1 - (Math.pow(1 + (interestAsPercentage / 12), -12 * duration));
    const monthlyPayment = top / bottom;
    const totalInterest = 12 * duration * monthlyPayment - loanAmount;
    return { monthlyPayment, totalInterest };
  }

  getAverage(values: number[]): number {
    const total = values.reduce((acc, value) => acc += value);
    return total / values.length;
  }
}
