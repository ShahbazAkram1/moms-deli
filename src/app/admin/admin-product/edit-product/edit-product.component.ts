import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { SharedService } from 'src/app/common/shared.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  productFormGroup:FormGroup;
  product:Product;
  category:ProductCategory;
  constructor(private formBuilder:FormBuilder,private productService:ProductService,private dataShare:SharedService,private route:Router,private categoryService:CategoryService){
    this.category = {} as ProductCategory; 
    this.product = {} as Product;
        this.dataShare.getData().subscribe(
          (data:any)=>{
            if(data!=null){
               this.product=data;
            }else{
                this.route.navigate(['admin/product']);
            }
        });

        this.productFormGroup = this.formBuilder.group({
          category:new FormControl(this.product.category.id,Validators.required),
          productName:new FormControl(this.product.name,Validators.required),
          productPrice:new FormControl(this.product.price,Validators.required),
          productStock:new FormControl(this.product.unitsInStock,Validators.required),
          productDescription:new FormControl(this.product.description,Validators.required)  ,
          imageUrl:new FormControl(this.product.imageUrl,Validators.required)
        });
        this.getAll();
  }

  isInvalid(formConrol:string){
    const control = this.productFormGroup.get(formConrol);
    return  control  && control.invalid &&  control.touched;
  }

  getValue(formControl:string){
    return this.productFormGroup.get(formControl)?.value;
  }

  editProduct(){
    // var jsonOutput = JSON.stringify(this.productFormGroup.value);
   if(this.productFormGroup.valid){
    this.product.name = this.getValue("productName");  
    this.product.price = this.getValue("productPrice");
    this.product.unitsInStock = this.getValue("productStock");
    this.product.description = this.getValue("productDescription");
    this.product.imageUrl = this.getValue("imageUrl");
    this.category.id = this.getValue("category");
    this.product.category = this.category;
      
    this.productService.updateProduct(this.product).subscribe(
      (data)=>{
        if(data!=null){
          Swal.fire({
            title: "Upated",
            text: "Product Updated Successfully!",
            icon: "success"
          });
          setTimeout(()=>{
            this.route.navigate(['admin/product']);
          },2000)
        }
      },
      (error)=>{

      }
    )
    }
  }

  categories:any;
  getAll() {
    this.categoryService.getAll().subscribe(
      (data: ProductCategory[]) => {
        this.categories = data;
        
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
