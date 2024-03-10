import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productFormGroup:FormGroup;
  category:ProductCategory;
  product:Product;
  constructor(private formBuilder:FormBuilder,private productService:ProductService,private categoryService:CategoryService,private route:Router){
    this.category = {} as ProductCategory; 
    this.product = {} as Product;
    this.productFormGroup = this.formBuilder.group({
        category:new FormControl('',Validators.required),
        productName:new FormControl('',Validators.required),
        productPrice:new FormControl('',Validators.required),
        productStock:new FormControl('',Validators.required),
        productDescription:new FormControl('',Validators.required)  ,
        imageUrl:new FormControl('',Validators.required)
      })
      this.getAll();
  }

  public addProduct(){

    console.log(this.productFormGroup.value);
    if(this.productFormGroup.valid){
      this.product.name = this.getValue("productName");  
      this.product.price = this.getValue("productPrice");
      this.product.unitsInStock = this.getValue("productStock");
      this.product.description = this.getValue("productDescription");
      this.product.imageUrl = this.getValue("imageUrl");
      this.category.id = this.getValue("category");
      this.product.category = this.category;
        
  
      this.productService.addProduct(this.product).subscribe(
        (data:any)=>{
            if(data!=null){
              Swal.fire({
                title: "Upated",  
                text: "Product Added Successfully!",
                icon: "success"
              });
              setTimeout(()=>{
                this.route.navigate(['admin/product']);
              },2000)
            }       
          
           }
      ),
      (error:any)=>{
        console.log("Error");
      }
    }
  }

  isInvalid(formConrol:string){
    const control = this.productFormGroup.get(formConrol);
    return  control  && control.invalid &&  control.touched;
  }

  getValue(formControl:string){
    return this.productFormGroup.get(formControl)?.value;
  }

  editProduct(dat:any){
    console.log(dat);
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
