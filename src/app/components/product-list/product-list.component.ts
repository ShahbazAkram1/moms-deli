import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { timeoutWith } from 'rxjs/operators';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { AdditionalItem } from 'src/app/common/AdditionalItem'; 
import { AdditionalItemsModalComponent } from '../additional-items-modal/additional-items-modal.component';
import { ProductCategory } from 'src/app/common/product-category';
// import { MatSelectChange } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AdditionalItemsService, GetResponseAdditionalItemsCategory } from 'src/app/services/additional-items.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  isCategory1Route: boolean = false;

  products: Product[] = [];
  category: ProductCategory[] = [];
  showAdditionalItems: boolean = false;
  selectedAdditionalItems!: AdditionalItem[];
  additionalItemsId!: number;
  additionalItemsName!: string;
  additionalItemsPrice!: number;
  additionImageURL!:string;
  additionalItem!: AdditionalItem;
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string | null = null;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private additionalItemsService: AdditionalItemsService,
              private dialog: MatDialog) {
                this.route.url.subscribe(segments => {
                  const lastSegment = segments[segments.length - 1].path;
                  this.isCategory1Route = lastSegment.endsWith('/category/1');
                });
              }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
      const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
      this.loadAdditionalItems(theProductId);
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {

    const theKeyword: string | null = this.route.snapshot.paramMap.get('keyword')!;

    // if we have a different keyword than previous
    // then set thePageNumber to 1

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               theKeyword).subscribe(this.processResult());
                                               
  }

  handleListProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    console.log(`Does it have category ID? ${ hasCategoryId }`);

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               this.currentCategoryId)
                                               .subscribe(this.processResult());
  }

  processResult() {
    return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  handlePageChange(event: PageEvent): void {
    this.thePageNumber = event.pageIndex + 1;
    this.thePageSize = event.pageSize;
    this.listProducts();
  }
  
  
  addToCart(theProduct: Product) {
    
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.price}`);

    // // TODO ... do the real work
    // const theCartItem = new CartItem(theProduct);

      // Create a new CartItem with an empty array for selectedToppings
    const theCartItem = new CartItem(theProduct, [], this.selectedAdditionalItems);
    this.cartService.addToCart(theCartItem);
  }

  loadAdditionalItems(productId: number) {
    this.additionalItemsService.getAdditionalItemsForProduct(productId).subscribe(
      (data: GetResponseAdditionalItemsCategory) => {
        this.selectedAdditionalItems = data;
        console.log('Additional Items:', this.selectedAdditionalItems);
      },
      error => {
        console.error('Error loading additional items:', error);
      }
    );
  }

  openAdditionalItemsModal(): void {
    console.log("category Id = " + this.currentCategoryId)
    if (this.currentCategoryId === 1) {
      const additionalItems = [
        new AdditionalItem(this.additionalItemsId, this.additionalItemsName, this.additionalItemsPrice,this.additionImageURL)
      ];
  
      const dialogRef = this.dialog.open(AdditionalItemsModalComponent, {
        data: {
          selectedAdditionalItems: additionalItems.slice() // Pass a copy of selectedAdditionalItems
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.selectedAdditionalItems = result.items;
          console.log('The dialog was closed with result:', result);
        }
      });
    }
  }

  toggleAdditionalItems(product: Product) {
    product.showAdditionalItems = !product.showAdditionalItems;
  }
}
