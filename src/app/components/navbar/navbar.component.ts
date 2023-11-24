import { Component } from '@angular/core';

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
}
