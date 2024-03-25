import { Component, OnInit, ViewChild } from '@angular/core';
import { AgChartOptions, AgCharts } from 'ag-charts-community';
import { getData } from './data';


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { AdditionalItemsService } from 'src/app/services/additional-items.service';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { CategoryService } from 'src/app/services/category.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public options: AgChartOptions;
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  currentUser:any;
  constructor(private additionItemService:AdditionalItemsService,private categoryService: CategoryService,private productService:ProductService,private authService:AuthService,private router:Router) {
    this.chartOptions = {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 250,
        type: "line",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Product Trends by Month",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      }
    };
      this.options = {
          data: getData(),
          title: {
              text: 'Product Order By Category',
          },
          series: [
              {
                  type: 'pie',
                  angleKey: 'amount',
                  calloutLabelKey: 'asset',
                  sectorLabelKey: 'amount',
                  sectorLabel: {
                      color: 'white',
                      fontWeight: 'bold',
                  },
              },
          ],
      };
  }
  ngOnInit(): void {
    this.getAllAdditionItemLength();
    this.getALlProducts();
    this.getAll();

   this.currentUser =  this.authService.getUser();

  }



  additionLength=0;
  public getAllAdditionItemLength(){
    this.additionItemService.getAllAdditionalItem().subscribe(
      (data:any)=>{
          this.additionLength = data.length;
      },
      (error:any)=>{

      }
    )
  }


  categoryLength=0;
  getAll() {
    this.categoryService.getAll().subscribe(
      (data: ProductCategory[]) => {
       this.categoryLength = data.length;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  productLength = 0;
  getALlProducts(){
    // this.productService.getAllProducts().subscribe(
    //   (data:any)=>{
    //     this.productLength = data.length;
    //   },
    //   (error)=>{
    //     console.log(error);
    //   }
    // )
  } 

  

}
