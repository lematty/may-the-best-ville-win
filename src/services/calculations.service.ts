import { Injectable } from '@angular/core';
import { UniversalListingProperties } from '../../models';

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

  getDifference(value1: number, value2: number): number {
    return value1 - value2;
  }

  getBuyEstimationForStudio(price: number) {
    const totalPrice = price * 25;
    const { monthlyPayment } = this.calculateInterest(totalPrice, 20, 1.15);
    return monthlyPayment;
  }

  dropPriceToBePositive(averagePriceBySurfaceArea: number, monthlyRentPrice: number): number {
    let averageBuyPrice = averagePriceBySurfaceArea;
    let monthlyBuyPrice = this.getBuyEstimationForStudio(averageBuyPrice);
    while (monthlyRentPrice - monthlyBuyPrice < 0) {
      averageBuyPrice -= 1;
      monthlyBuyPrice = this.getBuyEstimationForStudio(averageBuyPrice);
    }
    return averageBuyPrice;
  }

  getPostivityLine(minPriceBySurfaceArea: number): Array<{ maxPrice: number, surfaceArea: number }> {
    const maxPrice = 180000;
    const minSurfaceArea = 14;
    let currentSurfaceArea = minSurfaceArea;
    let totalPrice = 0;
    const minValues = [];
    console.log('minPriceBySurfaceArea', minPriceBySurfaceArea);
    while (totalPrice < maxPrice) {
      totalPrice = minPriceBySurfaceArea * currentSurfaceArea;
      console.log('totalPrice', totalPrice);
      if (totalPrice < maxPrice) {
        minValues.push({ maxPrice: totalPrice, minSurfaceArea: currentSurfaceArea });
      }
      currentSurfaceArea++;
    }
    return minValues;
  }

  getAverages(listings: UniversalListingProperties[]): { averagePrice: number, averageSurfaceArea: number, averagePriceBySurfaceArea: number } {
    const prices = [];
    const surfaceAreas = [];
    const pricesBySurfaceArea = [];
    listings.forEach(listing => {
      prices.push(listing.price),
      surfaceAreas.push(listing.surfaceArea);
      pricesBySurfaceArea.push(listing.price / listing.surfaceArea);
    });
    const averagePrice = this.getAverage(prices);
    const averageSurfaceArea = this.getAverage(surfaceAreas);
    const averagePriceBySurfaceArea = this.getAverage(pricesBySurfaceArea);
    return { averagePrice, averageSurfaceArea, averagePriceBySurfaceArea };
  }

  getRentEstimationForStudio(price: number) {
    return price * 25;
  }

  getMonthlyStudioEstimations(buyAreaPrice: number, rentAreaPrice: number): { monthlyBuyEstimation: number, monthlyRentEstimation: number } {
    const monthlyBuyEstimation = this.getBuyEstimationForStudio(buyAreaPrice);
    const monthlyRentEstimation = this.getRentEstimationForStudio(rentAreaPrice);
    return { monthlyBuyEstimation, monthlyRentEstimation };
  }
}
