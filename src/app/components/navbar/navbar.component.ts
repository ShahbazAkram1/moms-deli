import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { sidebarAnimation } from './sidebar.animation';
import { SidebarService } from './sidebarservice';
import { CartService } from 'src/app/services/cart.service';
import { ProductCategory } from 'src/app/common/product-category';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [sidebarAnimation],
})
export class NavbarComponent  implements AfterViewInit,OnInit{

  activeCategory!: string;
  trackByFn(index: number, category: any): string {
    return category.name; // You can use a unique property of your category object
  }

  constructor(private route: ActivatedRoute , private renderer: Renderer2,private productService: ProductService,private router:Router,public authService: AuthService,public sidebarService: SidebarService,public cartService:CartService) {

     // Subscribe to route changes to update the active category
     this.route.url.subscribe(urlSegments => {
      // Extract the last segment of the URL as the active category
      this.activeCategory = urlSegments[urlSegments.length - 1].path;
    });
  }
 currentUser:any;


 isActive(categoryName: any): boolean {
  return this.activeCategory === categoryName;
}


 isSidebarOpen = false;

 // Method to toggle the sidebar state
 toggleSidebar() {
   this.isSidebarOpen = !this.isSidebarOpen;
 }

  ngAfterViewInit() {
    // Using Renderer2 to manipulate the DOM in an Angular-friendly way
  
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getUsername(): string {
    // Assuming you have a method to decode the token and get the username
    const username = this.decodeTokenAndGetUsername();
    return username || '';
  }

  logout(): void {
    this.authService.logout();
    // Optionally: Redirect to the login page or perform other post-logout actions
  }

  private decodeTokenAndGetUsername(): string | null {

    const token = this.authService.getToken();
    if (token) {
    
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.username;
    }
    return null;
  }
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

 if(this.isLoggedIn()){
    this.currentUser =   this.authService.getUser();
 }

  }

  checkScreenWidth(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  productCategories: any[]=[];
  listProductCategories() {
    console.log("Method is running..");
    this.productService.getProductCategories().subscribe(
    (data) => {      
        this.productCategories = data;
        console.log(data);
      }
    );
  }

  productByCategory(id:any){
    this.router.navigate(['/category',id]);
    this.isSidebarShown=false;
  }


  public logoutUser(){
      this.authService.logout();
      this.router.navigate(['/']);
  }

  doSearch(value: string) {
    const formattedValue = value
      .toLowerCase()                  // Convert input to lowercase
      .replace(/(?:^|\s)\S/g, a => a.toUpperCase()); // Capitalize the first letter of each word
    this.router.navigateByUrl(`/search/${formattedValue}`);
  }

}
