import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { BreadOption } from 'src/app/common/BreadOption';


@Component({
selector: 'app-bread-options-dialog-component',
templateUrl: './bread-options-dialog-component.html',
styleUrls: ['./bread-options-dialog-component.css']
})
export class BreadOptionsDialogComponent {

selectedBreadOptions: BreadOption[] = [];
totalPrice: number = 0;

private originalSelectedBreadOptions: BreadOption[] = [];

constructor(
  public dialogRef: MatDialogRef<BreadOptionsDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private productService: ProductService
) {
  this.selectedBreadOptions = data.selectedBreadOptions;
  // Create a copy of selectedBreadOptions to keep the original state
  this.originalSelectedBreadOptions = data.selectedBreadOptions.map((option: BreadOption) => ({ ...option }));
}

ngOnInit(): void {
  this.fetchAllBreadOptions();
}

fetchAllBreadOptions(): void {
  this.productService.getAllBreadOptions().subscribe(
    (breadOptions: BreadOption[]) => {
      this.selectedBreadOptions = breadOptions;
      console.log('All Bread Options:', this.selectedBreadOptions);
    },
    (error) => {
      console.error('Error fetching all bread options:', error);
      // Handle error accordingly
    }
  );
}

toggleSelection(option: BreadOption, event: any): void {
  option.selected = event.checked; // Change 'isSelected' to 'selected'

  // Update total price based on selection
  if (option.selected) { // Change 'isSelected' to 'selected'
    this.totalPrice += option.price;
  } else {
    this.totalPrice -= option.price;
  }
}

onNoClick(): void {
  this.selectedBreadOptions = this.originalSelectedBreadOptions.map(option => ({ ...option }));
  this.dialogRef.close();
}

saveAndClose(): void {
  // Save bread options and close the modal
  this.dialogRef.close(this.selectedBreadOptions);
}

}

