import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdditionalItem } from 'src/app/common/AdditionalItem';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { AdditionalItemsService } from 'src/app/services/additional-items.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-additional-item',
  templateUrl: './add-additional-item.component.html',
  styleUrls: ['./add-additional-item.component.css']
})
export class AddAdditionalItemComponent {
  additionalItemForm!: FormGroup;
  additionItem:AdditionalItem;
  constructor(private fb: FormBuilder,private categoryService:CategoryService,private additionItemService:AdditionalItemsService,private router:Router) {
    this.category = {} as ProductCategory;
    this.additionItem = {} as AdditionalItem;
  }


  ngOnInit(): void {
    this.createForm();
    this.getAll();
  }

  category:ProductCategory;
  createForm(): void {
    this.additionalItemForm = this.fb.group({
      productName: ['',[Validators.required]],
      productPrice: [null, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      productImage: ['', Validators.required],
    });
  }

  onSubmit(): void {
    // Handle form submission here
    if (this.additionalItemForm.valid) {
      this.additionItem.name=this.getValue("productName");
      this.additionItem.price=this.getValue("productPrice");
      this.additionItem.imageURL=this.getValue("productImage");
      this.category.id = this.getValue("category");
      this.additionItem.selected=true;
      this.additionItem.category=this.category;
      console.log(this.additionItem);
      this.additionItemService.addAdditionalItem(this.additionItem).subscribe(
        (data:any)=>{
         if(data!=null) 
          Swal.fire({
            title: "SUCCESS",
            text: "Additional Item Added Successfully!",
            icon: "success"
          });
          setTimeout(()=>{
            this.router.navigate(['/admin/additional-item']);
          },2000)
        }
        
      )
    } else {
      console.log(this.additionalItemForm.value);
      // Form is invalid, handle accordingly
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


  isInvalid(formConrol:string){
    const control = this.additionalItemForm.get(formConrol);
    return  control  && control.invalid &&  control.touched;
  }

  getValue(formControl:string){
    return this.additionalItemForm.get(formControl)?.value;
  }

}
