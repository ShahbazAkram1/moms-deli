import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdditionalItem } from 'src/app/common/AdditionalItem';
import { SharedService } from 'src/app/common/shared.service';
import { AdditionalItemsService } from 'src/app/services/additional-items.service';

@Component({
  selector: 'app-edit-additional-items',
  templateUrl: './edit-additional-items.component.html',
  styleUrls: ['./edit-additional-items.component.css']
})
export class EditAdditionalItemsComponent {
  additionalItemForm!: FormGroup;
additionalItem:AdditionalItem;
  constructor(private fb: FormBuilder,private dataShare:SharedService,private router:Router,private additionalItemService:AdditionalItemsService) {
    this.additionalItem = {} as AdditionalItem;
  }

  ngOnInit(): void {
    this.dataShare.getData().subscribe(
      (data:any)=>{
        if(data!=null){
           this.additionalItem=data;
        }else{
            this.router.navigate(['admin/additoinal-item']);
        }
    });

    this.createForm();
  }

  createForm(): void {
    this.additionalItemForm = this.fb.group({
      productName: [ this.additionalItem.name, Validators.required],
      productPrice: [ this.additionalItem.price, [Validators.required, Validators.min(0)]],
      productCategory: ['',Validators.required],
      productImage: ['', Validators.required],
    });
  }

  onSubmit(): void {
    // Handle form submission here
    if (this.additionalItemForm.valid) {
      // const formData = this.additionalItemForm.value;
      this.additionalItemService.updateAdditionalItem(this.additionalItemForm.value).subscribe(
        (data:any)=>{
            alert("Data Updated Successfully!");
        },
        (error:any)=>{
          console.log(error);
        }
      )
      // Perform actions with the form data
    } else {
      // Form is invalid, handle accordingly
    }
  }
}
