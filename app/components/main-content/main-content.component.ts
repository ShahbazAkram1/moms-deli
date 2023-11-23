import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  showSearchBar: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Check the current route and hide the search bar for specific routes
      this.showSearchBar = !this.route.snapshot.children.some(child => 
        child.routeConfig && (child.routeConfig.path === 'about-us' || child.routeConfig.path === 'contact-us')
      );
    });
  }
}
