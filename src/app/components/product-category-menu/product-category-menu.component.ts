import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit, OnDestroy {

  productCategories!: ProductCategory[];
  isMobileCategoriesVisible = false; // Flag to track the visibility of mobile categories
  mobileQuery: MediaQueryList;

  private readonly mobileQueryListener: () => void;

  constructor(
    private productService: ProductService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit() {
    this.listProductCategories();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

  // Method to toggle mobile categories visibility
  toggleCategories() {
    this.isMobileCategoriesVisible = !this.isMobileCategoriesVisible;
  }

  // Method to close mobile categories when a category is clicked (optional)
  closeMobileCategories() {
    this.isMobileCategoriesVisible = false;
  }
}