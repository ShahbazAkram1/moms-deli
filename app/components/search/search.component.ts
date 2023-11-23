import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  doSearch(value: string) {
    const formattedValue = value
      .toLowerCase()                  // Convert input to lowercase
      .replace(/(?:^|\s)\S/g, a => a.toUpperCase()); // Capitalize the first letter of each word
  
    console.log(`value=${formattedValue}`);
    this.router.navigateByUrl(`/search/${formattedValue}`);
  }
  
  
  // doSearch(value: string) {
  //   console.log(`value=${value}`);
  //   this.router.navigateByUrl(`/search/${value}`);
  // }
}
