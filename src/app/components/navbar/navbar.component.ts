import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isNavbarOpen = false; // To control the visibility of the navbar
  constructor() {}

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
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
}
