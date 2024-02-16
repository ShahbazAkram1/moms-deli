import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdditionalItem } from 'src/app/common/AdditionalItem';
import { ProductCategory } from 'src/app/common/product-category';
import { SharedService } from 'src/app/common/shared.service';
import { AdditionalItemsService } from 'src/app/services/additional-items.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-additional-items',
  templateUrl: './additional-items.component.html',
  styleUrls: ['./additional-items.component.css']
})
export class AdditionalItemsComponent {
  additionItems:AdditionalItem[]=[];
    displayedColumns: string[] = ['id', 'name', 'price', 'action'];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<AdditionalItem>([]); // Initialize an empty data source
  constructor(private additionItemService:AdditionalItemsService,private router:Router,private dataShared:SharedService){
    this.getAllAdditionItem();
  }

  public getAllAdditionItem(){
    this.additionItemService.getAllAdditionalItem().subscribe(
      (data:any)=>{
          this.additionItems=data;
          this.dataSource.data=this.additionItems;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      },
      (error:any)=>{

      }
    )
  }

  editAdditionItem(data:any){
    this.dataShared.sendAnyData(data);
    this.router.navigate(['/admin/additional-item/edit']);
    }

    deleteAdditionItem(id:any){
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
          this.additionItemService.deleteAdditionalItem(id).subscribe(
            (data:any)=>{
              Swal.fire({
                title: "Deleted!",
                text: "Additional Item has been deleted.",
                icon: "success"
              });
              this.getAllAdditionItem();

            }
          )
        
        }
      });
    }

}
