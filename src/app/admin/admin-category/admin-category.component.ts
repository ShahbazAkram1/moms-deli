import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ProductCategory } from 'src/app/common/product-category';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/common/shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  categories: ProductCategory[] = [];
  displayedColumns: string[] = ['id', 'name', 'categoryRemarks', 'action'];
  dataSource = new MatTableDataSource<ProductCategory>([]); // Initialize an empty data source

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private matDialog: MatDialog, private categoryService: CategoryService,private router:Router,private dataShared:SharedService) {}
alertMessage = "";
  ngOnInit() {
    this.getAll();
    this.dataShared.getData().subscribe(
      (data:any)=>{
        if(data!=null){
            this.alertMessage = data;
        }
      }
    )
  }

  getAll() {
    this.categoryService.getAll().subscribe(
      (data: ProductCategory[]) => {
        this.categories = data;
        this.dataSource.data = this.categories; 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  openAddCateogryDialog() {
    this.matDialog.open(AddCategoryComponent, {
      width: '575px',
      height: '300px',
    });
  }

  editCategory(data:any){
    this.dataShared.sendAnyData(data);
    this.router.navigate(['admin/category/edit']);
    }

    applyFilter(filterValue: any) {
      this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
    
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    delete(category:ProductCategory){
      this.categoryService.deleteCategory(category).subscribe(
        (data:any)=>{
            if(data.code===200){
              Swal.fire({
                title: "SUCCESS",
                text: "Category Deleted Successfull!",
                icon: "success"
              });
              this.getAll();
            }else{
              Swal.fire({
                title: "Error",
                text: "Category Could not be deleted",
                icon: "error"
              });
            }
        },
        (error:any)=>{

        }
      )
    
      this.getAll();
    }

}

// Maaani achy waye 5 mnt kaye acha thu ok m   