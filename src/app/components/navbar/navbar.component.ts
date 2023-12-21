import { Component, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isNavbarOpen = false; // To control the visibility of the navbar
  constructor(private renderer: Renderer2,private productService: ProductService,private router:Router) {}


  isSidebarShown: boolean = false;


  toggleNav() {
    this.isSidebarShown = !this.isSidebarShown;
  }
  selectedCategory: string = ''; // Holds the selected category name

  showCategory(categoryName: string): void {
    this.selectedCategory = categoryName;
  }
  isScrolled: boolean = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 50; // Adjust the scroll threshold as needed
  }
  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenWidth();
  }

  ngOnInit(): void {
    this.checkScreenWidth();
    this.listProductCategories();
  }

  checkScreenWidth(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  productCategories!: ProductCategory[];
  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

  byCategory(id:any){
    this.router.navigate(['/category',id]);
    this.isSidebarShown=false;
  }

}
