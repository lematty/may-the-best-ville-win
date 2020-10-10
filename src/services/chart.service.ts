import { Injectable } from '@angular/core';
import { ChartType, ChartDataSets, ChartOptions, ChartPoint } from 'chart.js';
import { Country, UniversalListingProperties } from '../../models';
import { UniversalMetrics } from '../../models/universal.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  updateChartData(
    chartType: ChartType,
    data: UniversalListingProperties[],
    xAxis?: UniversalMetrics,
    yAxis?: UniversalMetrics,
  ): { datasets: ChartDataSets[], options?: ChartOptions } {
    switch (chartType) {
      case 'bar':
        return this.formatScatterChart(data, xAxis, yAxis);
      case 'bubble':
        return this.formatScatterChart(data, xAxis, yAxis);
      case 'doughnut':
        return this.formatScatterChart(data, xAxis, yAxis);
      case 'horizontalBar':
        return this.formatScatterChart(data, xAxis, yAxis);
      case 'line':
        return this.formatScatterChart(data, xAxis, yAxis);
      case 'pie':
        return this.formatScatterChart(data, xAxis, yAxis);
      case 'polarArea':
        return this.formatScatterChart(data, xAxis, yAxis);
      case 'radar':
        return this.formatScatterChart(data, xAxis, yAxis);
      case 'scatter':
        return this.formatScatterChart(data, xAxis, yAxis);

    }
  }

  formatScatterChart(
    data: UniversalListingProperties[],
    xAxis: UniversalMetrics,
    yAxis: UniversalMetrics
  ): { datasets: ChartDataSets[], options?: ChartOptions } {
    const citiesData: ChartDataSets[] = [];
    data.map((listing: UniversalListingProperties) => {
      const cityIndex = citiesData.findIndex((cityData: ChartDataSets) => cityData.label === listing.city);
      const newData = { x: listing[xAxis], y: listing[yAxis] };
      if (cityIndex === -1) {
        citiesData.push({ label: listing.city, data: [newData] });
      } else {
        const currentCityData = citiesData[cityIndex].data;
        const concatCityData = [...currentCityData, newData] as ChartPoint[];
        citiesData[cityIndex].data = concatCityData;
      }
    });
    // const options: ChartOptions = this.formatScatterChartOptions();
    let options: ChartOptions;
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

  formatLabel(country: Country, type: UniversalMetrics, value: string | number): string {
    switch (type) {
      case UniversalMetrics.Price:
        return this.formatCurrency(country, Number(value));
      case UniversalMetrics.SurfaceArea:
        return this.formatSurfaceArea(country, Number(value));
      case UniversalMetrics.NumberOfBedrooms:
        return this.formatRooms(value, true);
      case UniversalMetrics.NumberOfRooms:
        return this.formatRooms(value, false);
      default:
        return `${value}`;
    }
  }

  formatCurrency(country: Country, value: number): string {
    const usFormat = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }));
    const franceFormat = (new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }));
    const formatType = country === Country.France ? franceFormat : usFormat;
    return formatType.format(value) as string;
  }

  formatSurfaceArea(country: Country, value: number | string): string {
    const format = country === Country.France ? 'm²' : 'sqft';
    return `${value} ${format}`;
  }

  formatRooms(value: number | string, isBedrooms: boolean): string {
    const format = isBedrooms ? 'bdrms' : 'rms';
    return `${value} ${format}`;
  }

  updateTitle(chart: Chart, title: string) {
    chart.options.title.text = title;
    chart.update();
  }

  addData(chart: Chart, datasets: ChartDataSets[]) {
    datasets.forEach((dataset: ChartDataSets) => {
      chart.data.datasets.push({
        label: dataset.label,
        data: dataset.data,
        backgroundColor: this.getRandomColor()
      });
    });
    chart.update();
  }

  removeAllData(chart: Chart) {
    chart.data.labels = [];
    chart.data.datasets = [];
    chart.update();
  }

  updateDatasets(chart: Chart, datasets: ChartDataSets[]) {
    this.removeAllData(chart);
    this.addData(chart, datasets);
  }

  updateAxisTitles(chart: Chart, xAxisMetric: UniversalMetrics, yAxisMetric: UniversalMetrics) {
    chart.options.scales.xAxes[0].scaleLabel.labelString = xAxisMetric;
    chart.options.scales.yAxes[0].scaleLabel.labelString = yAxisMetric;
    chart.update();
  }

}
