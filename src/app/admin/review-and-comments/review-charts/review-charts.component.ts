import { Component } from '@angular/core';
import { AgChartOptions, AgCharts } from 'ag-charts-community';
import { getData } from './data';

@Component({
  selector: 'app-review-charts',
  templateUrl: './review-charts.component.html',
  styleUrls: ['./review-charts.component.css']
})
export class ReviewChartsComponent {
  public options!: AgChartOptions;

  constructor() {
      this.options = {
          data: getData(),
          title: {
              text: 'Reviews',
          },
          series: [
              {
                  type: 'pie',
                  angleKey: 'amount',
                  legendItemKey: 'asset',
              },
          ],
      };
  }

  ngOnInit() {
      
  }
}
