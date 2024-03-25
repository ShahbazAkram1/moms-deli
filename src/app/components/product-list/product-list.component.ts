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
import {
  AdditionalItemsService,
  GetResponseAdditionalItemsCategory,
} from 'src/app/services/additional-items.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Page } from 'src/app/common/Page';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list-grid.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
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
  additionImageURL!: string;
  additionalItem!: AdditionalItem;
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string | null = null;
  productsPage: Page<Product>;
  pageSize = 10;
  isLoading: boolean = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private additionalItemsService: AdditionalItemsService,
    private dialog: MatDialog
  ) {
    this.productsPage = {} as Page<Product>;
    this.route.url.subscribe((segments) => {
      const lastSegment = segments[segments.length - 1].path;
      this.isCategory1Route = lastSegment.endsWith('/category/1');
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryId = params['categoryId'];

      if (categoryId) {
        this.isLoading = true;
        this.getProductsByCategory(categoryId,0);
      }
    else{
      this.isLoading = true;
      this.getPaginatedProducts(0);
    }
    });
  }

  getPaginatedProducts(page: number): void {
    this.productService.getPaginatedProducts(page, this.pageSize)
      .subscribe(data => {
        this.productsPage = data;
        this.isLoading = false;
      }, error => {
        console.error('Error fetching paginated products.', error);
      });
  } 
  
  getProductsByCategory(categoryId:number,page: number): void {
   
    this.productService.getProductsByCategory(categoryId,page, this.pageSize)
      .subscribe(data => {
        this.productsPage = data;
        this.isLoading = false;

      }, error => {
        console.error('Error fetching paginated products.', error);
      });
  }

  onPageChanged(event:any): void {
    this.isLoading = true;
    this.pageSize=event.pageSize;
    this.getPaginatedProducts(event.pageIndex);
  }
  loading: boolean = true;
 

  searchProducts(keyword: string): void {
    this.isLoading = true;
    this.productService.searchProducts(keyword, 0, this.pageSize)
      .subscribe(data => {
        this.productsPage = data;
        this.isLoading = false;
      }, error => {
        console.error('Error searching for products.', error);
        this.isLoading = false;
      });
  }
  

  itemCart! :CartItem;;
  addToCart(theProduct: Product) {
    console.log(theProduct);
    this.itemCart = {} as CartItem;
    this.itemCart.id=theProduct.id;
    this.itemCart.price=theProduct.price;
    this.itemCart.imageUrl=theProduct.imageUrl;
    this.itemCart.quantity=1;
    this.itemCart.category  = theProduct.category;
    this.itemCart.name = theProduct.name;
    // // TODO ... do the real work
    // const theCartItem = new CartItem(theProduct);

    // Create a new CartItem with an empty array for selectedToppings
   
    this.cartService.addToCart(this.itemCart);
  }

  loadAdditionalItems(productId: number) {
    this.additionalItemsService
      .getAdditionalItemsForProduct(productId)
      .subscribe(
        (data: GetResponseAdditionalItemsCategory) => {
          this.selectedAdditionalItems = data;
          console.log('Additional Items:', this.selectedAdditionalItems);
        },
        (error) => {
          console.error('Error loading additional items:', error);
        }
      );
  }

  openAdditionalItemsModal(): void {
    console.log('category Id = ' + this.currentCategoryId);
    if (this.currentCategoryId === 1) {
      const additionalItems = [
        new AdditionalItem(
          this.additionalItemsId,
          this.additionalItemsName,
          this.additionalItemsPrice,
          this.additionImageURL
        ),
      ];

      const dialogRef = this.dialog.open(AdditionalItemsModalComponent, {
        data: {
          selectedAdditionalItems: additionalItems.slice(), // Pass a copy of selectedAdditionalItems
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
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
