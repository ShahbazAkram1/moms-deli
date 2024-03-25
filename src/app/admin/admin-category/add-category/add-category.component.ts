import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { SharedService } from 'src/app/common/shared.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
category:ProductCategory;
  constructor(private fb: FormBuilder,private categoryServie:CategoryService,private router:Router,private dataShared:SharedService) { 
    this.category = {} as ProductCategory;
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      categoryRemarks: ['REmarks', Validators.required]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.category.name= this.categoryForm.get("name")?.value;
      console.log(this.category);
      this.categoryServie.addCategory(this.category).subscribe(
        (data:any)=>{
          Swal.fire({
            title: "Upated",
            text: "Category Added Successfully!",
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