import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { SharedService } from 'src/app/common/shared.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
category:ProductCategory;
  constructor(private fb: FormBuilder,private categoryServie:CategoryService,private dataShare:SharedService,private router:Router) { 
    this.category = {} as ProductCategory;
  }

  ngOnInit(): void {
    this.dataShare.getData().subscribe(
      (data:any)=>{
        if(data!=null){
           this.category=data;
        }else{
            this.router.navigate(['admin/product']);
        }
    });
    this.categoryForm = this.fb.group({
      categoryName: [this.category.name, Validators.required],
      categoryRemarks: ['REmarks', Validators.required]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.category.categoryName= this.categoryForm.get("categoryName")?.value;
      console.log(this.category);
      this.categoryServie.editCategory(this.category).subscribe(
        (data:any)=>{
          Swal.fire({
            title: "Upated",
            text: "Category Updated Sccessfully!",
            icon: "success"
          });
          setTimeout(()=>{
            this.router.navigate(['admin/category/']);
          },2000);
        },
        (error:any)=>{
            console.log(error);
        }
      )
    } else {
      this.markFormGroupTouched(this.categoryForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }



}