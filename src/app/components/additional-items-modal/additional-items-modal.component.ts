import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { AdditionalItem } from 'src/app/common/AdditionalItem';

@Component({
  selector: 'app-additional-items-modal',
  templateUrl: './additional-items-modal.component.html',
  styleUrls: ['./additional-items-modal.component.css']
})
export class AdditionalItemsModalComponent implements OnInit {

  selectedAdditionalItems: AdditionalItem[] = [];
  totalPrice: number = 0;

  private originalSelectedAdditionalItems: AdditionalItem[] = [];

  constructor(
    public dialogRef: MatDialogRef<AdditionalItemsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) {
    this.selectedAdditionalItems = data.selectedAdditionalItems;
    // Create a copy of selectedAdditionalItems to keep the original state
    this.originalSelectedAdditionalItems = data.selectedAdditionalItems.map((item: AdditionalItem[]) => ({ ...item }));
  }

  ngOnInit(): void {
    this.fetchAllAdditionalItems();
  }

  fetchAllAdditionalItems(): void {
    this.productService.getAllAdditionalItems().subscribe(
      (additionalItems: AdditionalItem[]) => {
        this.selectedAdditionalItems = additionalItems;
        console.log('All Additional Items:', this.selectedAdditionalItems);
      },
      (error) => {
        console.error('Error fetching all additional items:', error);
        // Handle error accordingly
      }
    );
  }

  toggleSelection(item: AdditionalItem, event: any): void {
    item.selected = event.checked; // Change 'isSelected' to 'selected'

    // Update total price based on selection
    if (item.selected) { // Change 'isSelected' to 'selected'
      this.totalPrice += item.price;
    } else {
      this.totalPrice -= item.price;
    }
  }

  onNoClick(): void {
    this.selectedAdditionalItems = this.originalSelectedAdditionalItems.map(item => ({ ...item }));
    this.dialogRef.close();
  }

  saveAndClose(): void {
    // Save additional items and close the modal
    this.dialogRef.close(this.selectedAdditionalItems);
  }

}
