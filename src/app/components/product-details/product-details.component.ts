import { Component, Inject, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import {
  GetResponseAdditionalItemsCategory,
  AdditionalItemsService,
} from 'src/app/services/additional-items.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { AdditionalItem } from 'src/app/common/AdditionalItem';
import { AdditionalItemsModalComponent } from '../additional-items-modal/additional-items-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();
  showAdditionalItems: boolean = false;
  selectedAdditionalItems: AdditionalItem[] = [];
  // selectedAdditionalItems!: AdditionalItem;
  // additionalItem: AdditionalItem = new AdditionalItem();
  additionalItemsId!: number;
  additionalItemsName!: string;
  additionalItemsPrice!: number;
  additionImageURL!: string;
  additionalItem!: AdditionalItem;
  // selectedAdditionalItems: AdditionalItem[] | undefined;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private additionalItemsService: AdditionalItemsService,
    // public dialogRef: MatDialogRef<AdditionalItemsModalComponent>,
    private dialog: MatDialog
  ) {
    this.additionalItem = new AdditionalItem(
      this.additionalItemsId,
      this.additionalItemsName,
      this.additionalItemsPrice,
      this.additionImageURL
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
      const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
      this.loadAdditionalItems(theProductId);
    });
  }

  handleProductDetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
      console.log('Product:', this.product);
    });
  }

  loadAdditionalItems(productId: number) {
    this.additionalItemsService
      .getAdditionalItemsForProduct(productId)
      .subscribe(
        (data: GetResponseAdditionalItemsCategory) => {
          // Ensure data is an array
          if (Array.isArray(data)) {
            this.selectedAdditionalItems = data;
          } else {
            // Handle the case where data is not an array (adjust this part based on your service response structure)
            console.error('Invalid additional items data:', data);
          }
          console.log('Additional Items:', this.selectedAdditionalItems);
        },
        (error) => {
          console.error('Error loading additional items:', error);
        }
      );
  }

  toggleAdditionalItems() {
    this.showAdditionalItems = !this.showAdditionalItems;
  }

  openAdditionalItemsModal(): void {
    // const additionalItems = [
    //   new AdditionalItem(this.additionalItemsId, this.additionalItemsName, this.additionalItemsPrice)
    // ];

    const dialogRef = this.dialog.open(AdditionalItemsModalComponent, {
      data: {
        selectedAdditionalItems: this.selectedAdditionalItems.slice(), // Pass a copy of selectedAdditionalItems
        // selectedAdditionalItems: additionalItems.slice() // Pass a copy of selectedAdditionalItems
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedAdditionalItems = result;
        console.log('The dialog was closed with result:', result);
      }
    });
  }

  addToCart() {
    console.log(`Adding to cart: ${this.product.name}, ${this.product.price}`);
    console.log(this.product._links);
    // Use the nullish coalescing operator to handle possible undefined
    //const selectedToppings = this.product.selectedToppings ?? [];
    const theCartItem = new CartItem(
      this.product,
      [],
      this.selectedAdditionalItems,
      this.product._links.category
    );
    // Include additional items in the cart item
    //const theCartItem = new CartItem(this.product, selectedToppings, this.selectedAdditionalItems);

    this.cartService.addToCart(theCartItem);
  }
}
