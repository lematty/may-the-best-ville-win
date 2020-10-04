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
    const options: ChartOptions = this.formatScatterChartOptions();
    return { datasets: citiesData, options };
  }

  getRandomColor(): string {
    // const letters = '0123456789ABCDEF';
    // let color = '#';
    // for (let i = 0; i < 6; i++) {
    //   color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  }

  formatScatterChartOptions(): ChartOptions {
    return {
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
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

}
