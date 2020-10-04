import { Component, OnInit, Input } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.less']
})
export class ScatterChartComponent implements OnInit {
  @Input() title?: string;
  @Input() datasets: ChartDataSets[];
  @Input() options: ChartOptions;

  constructor() { }

  ngOnInit(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const scatterChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        // datasets: [{
        //     label: 'Scatter Dataset',
        //     data: [{
        //         x: -10,
        //         y: 0
        //     }, {
        //         x: 0,
        //         y: 10
        //     }, {
        //         x: 10,
        //         y: 5
        //     }]
        // }]
        datasets: this.datasets,
      },
      // options: {
      //   scales: {
      //     xAxes: [{
      //       type: 'linear',
      //       position: 'bottom'
      //     }]
      //   }
      // }
      options: this.options,
    });
  }

}
