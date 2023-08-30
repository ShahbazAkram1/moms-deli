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

  // search for product case insensitive
  // doSearch(value: string) {
  //   const caseInsensitiveValue = new RegExp(value, 'i');
  //   console.log(`value=${caseInsensitiveValue}`);
  //   this.router.navigateByUrl(`/search/${caseInsensitiveValue}`);
  // }
  
  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }
}
