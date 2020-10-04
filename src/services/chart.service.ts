import { Injectable } from '@angular/core';
import { ChartType, ChartDataSets, ChartOptions, ChartPoint } from 'chart.js';
import { AllCitiesList, UniversalListingProperties } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  createChartData(chartType: ChartType, data: UniversalListingProperties[]): { datasets: ChartDataSets[], options?: ChartOptions } {
    switch (chartType) {
      case 'bar':
        return this.formatBarChart();
      case 'bubble':
        return this.formatBarChart();
      case 'doughnut':
        return this.formatBarChart();
      case 'horizontalBar':
        return this.formatBarChart();
      case 'line':
        return this.formatBarChart();
      case 'pie':
        return this.formatBarChart();
      case 'polarArea':
        return this.formatBarChart();
      case 'radar':
        return this.formatBarChart();
      case 'scatter':
        return this.formatScatterChart(data);
    }
  }

  formatScatterChart(data: UniversalListingProperties[]): { datasets: ChartDataSets[], options?: ChartOptions } {
    // const cities = [...new Set( data.map(listing => listing.city)) ];
    const citiesData: ChartDataSets[] = [];
    data.map((listing: UniversalListingProperties) => {
      const cityIndex = citiesData.findIndex((cityData: ChartDataSets) => cityData.label === listing.city);
      const newData = { x: listing.price, y: listing.surfaceArea };
      if (cityIndex === -1) {
        citiesData.push({ label: listing.city, data: [newData] });
      } else {
        const currentCityData = citiesData[cityIndex].data;
        const concatCityData = [...currentCityData, newData] as ChartPoint[];
        citiesData[cityIndex].data = concatCityData;
      }
    });
    let options: ChartOptions;
    return { datasets: citiesData, options };
  }

  formatBarChart(): any {
    return;
  }

}
