import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AdditionalItem } from 'src/app/common/AdditionalItem';
import { Product } from 'src/app/common/product';
import { SharedService } from 'src/app/common/shared.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent  implements OnInit{
 
  displayedColumns: string[] = ['id', 'name', 'price','active','unitsInStock', 'action'];
  dataSource = new MatTableDataSource<Product[]>([]); // Initialize an empty data source

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService:ProductService,private router:Router,private dataShared:SharedService){
  } 
  ngOnInit(): void {
    this.getALlProducts();

    }
    products:any[]=[];
  getALlProducts(){
  //   this.productService.getAllProducts(null).subscribe(
  //     (data:any)=>{
  //       console.log(data);
  //       this.products=data;
  //     this.dataSource.data= this.products;
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     },
  //     (error)=>{
  //       console.log(error);
  //     }
  //   )
  } 

  editProduct(data:any){
    this.dataShared.sendAnyData(data);
    this.router.navigate(['/admin/product/edit']);
    }


    applyFilter(filterValue: any) {
      this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
    
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    
    deleteProduct(id:any){
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProduct(id).subscribe(
            (data:any)=>{
              Swal.fire({
                title: "Upated",
                text: "Product Deleted Successfully!",
                icon: "success"
              });
              setTimeout(()=>{
                this.router.navigate(['admin/product']);
              },2000);
                
            }
          )
          }
        }
      );
        
        
    }

}
