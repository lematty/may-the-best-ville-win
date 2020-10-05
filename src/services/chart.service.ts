import { Injectable } from '@angular/core';
import { ChartType, ChartDataSets, ChartOptions, ChartPoint } from 'chart.js';
import { AllCitiesList, Country, UniversalListingProperties } from '../../models';

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
    const options: ChartOptions = this.formatScatterChartOptions();
    return { datasets: citiesData, options };
  }

  getRandomColor(): string {
    const maxHexCombos = 16777215;
    const randomColor = '#' + Math.floor(Math.random() * maxHexCombos).toString(16);
    return randomColor;
  }

  formatScatterChartOptions(): ChartOptions {
    return {
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
          ticks: {
            min: 0,
          },
        }],
        yAxes: [{
          ticks: {
            min: 0,
          },
        }]
      },
    };
  }

  formatBarChart(): any {
    return;
  }

  formatCurrency(country: Country, value: number) {
    const usFormat = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }));
    const franceFormat = (new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }));
    const formatType = country === Country.France ? franceFormat : usFormat;
    return formatType.format(value);
  }

  formatSurfaceArea(country: Country, value: number | string) {
    const format = country === Country.France ? 'm2' : 'sqft';
    return `${value} ${format}`;
  }

}
