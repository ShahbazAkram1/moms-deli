import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-solid-review-chart',
  templateUrl: './product-solid-review-chart.component.html',
  styleUrls: ['./product-solid-review-chart.component.css']
})
export class ProductSolidReviewChartComponent implements OnInit {
  chartOptions: any;

  ngOnInit() {
    this.chartOptions = {
      series: [{
        type: 'bar',
        xKey: 'product',
        yKeys: ['solid'],
        data: [
          { product: 'Product A', solid: 30 },
          { product: 'Product B', solid: 50 },
          { product: 'Product C', solid: 20 },
          // Add more data as needed
        ]
      }],
      title: {
        text: 'Product Solid Chart'
      },
      legend: {
        enabled: true
      }
      // Add more chart configuration options as needed
    };
  }
}